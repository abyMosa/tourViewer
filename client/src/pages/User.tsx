import React, { useEffect, useState } from 'react';
import { Snackbar, Btn, Container, Col, Row, Loader, HeadLine, TextInput, Modal, Switch } from '@abymosa/ipsg';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { fetchUserTours, getTourIframeViewerLink, getTourViewerLink, getTourImageUrl, deleteTour, getTourUrl } from "../store/actions";
import { ApplicationState } from '../store/reducers';
import { api } from "../axios";
import { format_DD_MM_YYYY } from "../utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faLink, faPencilAlt, faFileDownload, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Tour } from "../types/types";
import PaginatedContent from '../components/PaginatedContent';
import cn from 'classnames';

interface EditTourForm {
    name: string;
    description: string;
    previewImage: (File | null);
    userDataFile: (File | null);
    tourDataFile: (File | null);
}


interface EditingTour {
    isModalOpen: boolean;
    loading: boolean;
    tour: Tour | null;
}

enum ViewType {
    ListView,
    DigestView
}

const User = () => {

    const defaultTourEditData: EditTourForm = { name: '', description: '', previewImage: null, userDataFile: null, tourDataFile: null }
    const [editTourForm, setEditTourForm] = useState(defaultTourEditData);

    const defaultEditState: EditingTour = { isModalOpen: false, loading: false, tour: null }
    const [editingState, setEditingState] = useState<EditingTour>(defaultEditState);

    const [viewType, setViewType] = useState<ViewType>(ViewType.ListView);

    const [showDeletedSnackbar, setShowDeletedSnackbar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isDeletingTour, setIsDeletingTour] = useState(false);
    const [tourToDelete, setTourToDelete] = useState<Tour | null>(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const { isAuthenticated, user } = useSelector((state: ApplicationState) => state.auth);
    const { userTours, loadingUserTours } = useSelector((state: ApplicationState) => state.tours);

    const [filterText, setFilterText] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserTours(api, user._id));
        }
    }, [dispatch, user]);

    const filteredToures = userTours.filter(t => t.name?.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
    const filterButNoResult = filteredToures.length === 0 && filterText !== '';
    const toursToDisplay = (filteredToures.length !== 0 || filterButNoResult) ? filteredToures : userTours;



    const closeEditModal = () => {
        setEditingState(s => ({ ...s, isModalOpen: false }));
        setEditTourForm(defaultTourEditData)
    }

    const openEditModal = (tour: Tour) => {
        setEditingState(s => ({ ...s, isModalOpen: true, tour }));
        setEditTourForm({
            name: tour.name,
            description: tour.description || '',
            previewImage: null,
            userDataFile: null,
            tourDataFile: null,
        })
    }


    const showDeleteModal = (tour: Tour) => {
        setTourToDelete(tour);
        setShowModal(true);
    }

    const hideDeleteModal = () => {
        setTourToDelete(null);
        setShowModal(false);
    }

    const deleteMyTour = (tour: Tour) => {
        console.log('delete');
        setIsDeletingTour(true);
        dispatch(deleteTour(api, tour._id, ({ status }) => {
            switch (status) {
                case 200:
                    if (user) {
                        dispatch(fetchUserTours(api, user._id));
                        setIsDeletingTour(false);
                        setShowDeletedSnackbar(true);
                        console.log('status 200');
                        hideDeleteModal();
                    }
                    console.log('no user');
                    break;

                default:
                    console.log('default');
                    setIsDeletingTour(false);
                    hideDeleteModal();
                    break;
            }
        }));
    }


    const submitEditForm = (tour: Tour) => {
        let { name, description, previewImage, userDataFile, tourDataFile } = editTourForm;
        if (name === "" && description === '' && !previewImage && !userDataFile && !tourDataFile) {
            closeEditModal();
            return;
        }

        setEditingState(s => ({ ...s, loading: true }));


        var options = {
            headers: { 'Content-Type': "multipart/form-data" }
        };

        var bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('description', description);
        if (previewImage) {
            bodyFormData.append('previewImage', previewImage);
        }
        if (userDataFile) {
            bodyFormData.append('userDataFile', userDataFile);
        }
        if (tourDataFile) {
            bodyFormData.append('tourDataFile', tourDataFile);
        }

        api.patch(`/tour/${tour._id}`, bodyFormData, options)
            .then(res => {
                console.log(res);
                if (user) {
                    dispatch(fetchUserTours(api, user._id));
                }
                closeEditModal();
                window.location.reload(false);

            })
            .catch(err => {
                console.log(err);
                closeEditModal();
            });
    }

    return (
        !isAuthenticated ? <Redirect to='/login' /> :
            <Container className="px-3 user-container">
                <Snackbar
                    show={showSnackbar}
                    message="Copied to Clipboard"
                    onComplete={() => setShowSnackbar(false)}
                    timeOut={3000}
                />
                <Snackbar
                    show={showDeletedSnackbar}
                    message="Tour Deleted"
                    onComplete={() => setShowDeletedSnackbar(false)}
                    timeOut={3000}
                />

                <Modal
                    show={showModal}
                    backDropClicked={() => hideDeleteModal()}
                >
                    <h3 className="mt-0">Delete Tour!</h3>
                    <Loader show={isDeletingTour} />
                    <p>Are you sure you want to delete tour {tourToDelete?.name}</p>
                    <Btn text="cancel" dark className="mr-3" onClick={() => hideDeleteModal()} />
                    <Btn
                        error
                        text="delete"
                        onClick={() => {
                            tourToDelete && deleteMyTour(tourToDelete);
                        }}
                    />

                </Modal>

                <Modal
                    show={editingState.isModalOpen}
                    backDropClicked={() => closeEditModal()}
                    className="edit-tour-modal"
                >
                    <h3 className="mt-0">Edit Tour</h3>
                    <Loader show={editingState.loading} />

                    <div className="mb-4">
                        <TextInput
                            name="name"
                            value={editTourForm.name}
                            type="text"
                            label="Name"
                            errors={[]}
                            onChange={(e: any) => setEditTourForm(f => ({ ...f, name: e.target.value }))}
                        />
                    </div>
                    <div className="mb-4">
                        <TextInput
                            name="description"
                            value={editTourForm.description}
                            type="textarea"
                            label="Description"
                            errors={[]}
                            onChange={(e: any) => setEditTourForm(f => ({ ...f, description: e.target.value }))}
                        />
                    </div>
                    <div className="mb-4">
                        <h4>Replace Preview Image</h4>
                        <input
                            type="file"
                            disabled={editingState.loading}
                            onChange={(e: any) => setEditTourForm(f => ({ ...f, previewImage: e.target.files[0] }))}
                            accept=".jpg"
                        />
                    </div>
                    <div className="mb-4">
                        <h4>Replace userData.json file</h4>
                        <input
                            type="file"
                            disabled={editingState.loading}
                            onChange={(e: any) => setEditTourForm(f => ({ ...f, userDataFile: e.target.files[0] }))}
                            accept=".json"
                        />
                    </div>
                    <div className="mb-4">
                        <h4>Replace tourData.json file</h4>
                        <input
                            type="file"
                            disabled={editingState.loading}
                            onChange={(e: any) => setEditTourForm(f => ({ ...f, tourDataFile: e.target.files[0] }))}
                            accept=".json"
                        />
                    </div>

                    <div className="df f-jc-end">
                        <Btn text="cancel" dark className="mr-3 " onClick={() => closeEditModal()} />
                        <Btn error text="update tour"
                            onClick={() => {
                                editingState.tour && submitEditForm(editingState.tour);
                            }}
                        />
                    </div>

                </Modal>

                <Row className="" >

                    <Col md12>
                        <div className="df f-aa-end f-jc-sb user-container__tours-header">
                            <div>
                                <div className="df f-aa-center">
                                    <p className="mb-0 mt-3 mr-3 text-sm">{userTours?.length} found</p>
                                    <Switch onChange={(e: any) => setViewType(e.target.checked ? ViewType.DigestView : ViewType.ListView)} />
                                </div>
                                <div className="df f-aa-center">
                                    <HeadLine title="Tours" />
                                    <Link to='user/addtour'><Btn className="ml-3" text="Add New" sm /></Link>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <TextInput
                                        name="search"
                                        value={filterText}
                                        type="text"
                                        label="Filter tours by name"
                                        errors={[]}
                                        onChange={(e: any) => setFilterText(e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>

                        <Loader show={loadingUserTours} />

                        <div className={cn("tours-content", viewType === ViewType.DigestView && "tours-content--digest")} >
                            {
                                userTours.length === 0
                                    ? <p>No tours to display. maybe add a new tour <Link to='user/addtour'>here</Link></p>
                                    : filterButNoResult
                                        ? <p>Couldnt find tours that match your filter query.</p>
                                        : <PaginatedContent
                                            loading={false}
                                            className=""
                                            pageLimit={12}
                                            data={toursToDisplay}
                                            renderRow={(t: any) => {
                                                return (
                                                    <div className="tours-content__tour" key={t._id}>
                                                        <div className="tours-content__image"><img alt={t.name} src={getTourImageUrl(t.url)} /></div>
                                                        <div className="tours-content__details">
                                                            <div className="df f-aa-center f-jc-sb ma-0">
                                                                <h3 className="capitalise-fl ma-0 ">{t.name}</h3>
                                                                {viewType === ViewType.DigestView &&
                                                                    <div className="df f-jc-end f-aa-center mt-2">
                                                                        <FontAwesomeIcon
                                                                            className="pointer mr-1"
                                                                            icon={faLink}
                                                                            color='#555555'
                                                                            size='sm'
                                                                            title="Copy link to Clipboard"
                                                                            onClick={() => {
                                                                                navigator.clipboard.writeText(getTourIframeViewerLink(t._id));
                                                                                setShowSnackbar(true);
                                                                            }}
                                                                        />
                                                                        <FontAwesomeIcon
                                                                            className="pointer mr-1"
                                                                            icon={faPencilAlt}
                                                                            color='#555555'
                                                                            size='sm'
                                                                            title="Edit tour"
                                                                            onClick={() => openEditModal(t)}
                                                                        />

                                                                        <a
                                                                            href={`${getTourUrl(t.url)}/tourData.json`}
                                                                            download={`${t.name}-tourData.json`}
                                                                            className="mr-2"
                                                                            title="Download tourData.json"
                                                                        >
                                                                            <FontAwesomeIcon icon={faDownload} color='#555555' size='sm' />
                                                                        </a>

                                                                        <a
                                                                            href={`${getTourUrl(t.url)}/userData.json`}
                                                                            download={`${t.name}-userData.json`}
                                                                            title="Download userData.json"
                                                                        >
                                                                            <FontAwesomeIcon icon={faFileDownload} color='#555555' size='sm' />
                                                                        </a>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <p className="mb-3 mt-1 tag"> {format_DD_MM_YYYY(new Date(t.createdAt).getTime() / 1000)}</p>
                                                            <p className="tours-content__description">{t.description}</p>
                                                            <div
                                                                className="code-wrapper"
                                                                title="Copy to Clipboard"
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(getTourIframeViewerLink(t._id));
                                                                    setShowSnackbar(true);
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faCopy} color='#555555' size='sm' />
                                                                <div className="ml-2">
                                                                    <code> {getTourIframeViewerLink(t._id)} </code>
                                                                </div>
                                                            </div>
                                                            <div className="tours-content__downloads">
                                                                <div>
                                                                    <a
                                                                        href={`${getTourUrl(t.url)}/tourData.json`}
                                                                        download={`${t.name}-tourData.json`}
                                                                        className="mr-2 df f-aa-center "
                                                                        title="Download tourData.json"
                                                                    >
                                                                        <div className="svg-wrap">
                                                                            <FontAwesomeIcon icon={faDownload} color='#555555' size='sm' />
                                                                        </div>
                                                                        <p className="ma-0 pl-2">Download tourData.json file </p>
                                                                    </a>

                                                                </div>
                                                                <div>

                                                                    <a
                                                                        href={`${getTourUrl(t.url)}/userData.json`}
                                                                        download={`${t.name}-userData.json`}
                                                                        title="Download userData.json"
                                                                        className="df f-aa-center"
                                                                    >
                                                                        <div className="svg-wrap">
                                                                            <FontAwesomeIcon icon={faFileDownload} color='#555555' size='sm' />
                                                                        </div>
                                                                        <p className="ma-0 pl-2">Download userData.json file </p>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tours-content__actions">

                                                            <Btn sm dark className="" text="edit" onClick={() => openEditModal(t)} />
                                                            <Btn sm error className="" text="delete" onClick={() => showDeleteModal(t)} />
                                                            <a
                                                                href={getTourIframeViewerLink(t._id)}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="nodecoration"
                                                            >
                                                                <Btn sm className="" text="open" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            }

                                        />

                                // : toursToDisplay.map(t => {
                            }
                        </div>

                    </Col>
                </Row>
            </Container >

    );
};

export default User;