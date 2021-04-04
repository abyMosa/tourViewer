import React, { useEffect, useState } from 'react';
import { Snackbar, Btn, Container, Col, Row, Loader, HeadLine, TextInput } from '@abymosa/ipsg';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { fetchUserTours, getTourViewerLink } from "../store/actions";
import { ApplicationState } from '../store/reducers';
import { api } from "../axios";
import { format_DD_MM_YYYY } from "../utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const User = () => {

    // const [showModal, setShowModal] = useState(false);
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

    const filteredToures = userTours.filter(t => t.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
    const filterButNoResult = filteredToures.length === 0 && filterText !== '';
    const toursToDisplay = (filteredToures.length !== 0 || filterButNoResult) ? filteredToures : userTours;

    return (
        !isAuthenticated ? <Redirect to='/login' /> :
            <Container className="px-3 user-container">
                <Snackbar
                    show={showSnackbar}
                    message="Copied to Clipboard"
                    onComplete={() => setShowSnackbar(false)}
                    timeOut={3000}
                />

                <Row className="" >

                    <Col md12>
                        <div className="df f-aa-end f-jc-sb user-container__tours-header">
                            <div>
                                <p className="my-0  text-sm">{userTours?.length} found</p>
                                <div className="df f-aa-center">
                                    <HeadLine title="Tours" />
                                    <Link to='user/addtour'><Btn className="ml-3" text="Add New" sm /></Link>
                                </div>
                            </div>
                            <TextInput
                                name="search"
                                value={filterText}
                                type="text"
                                label="Filter tours by name"
                                errors={[]}
                                onChange={(e: any) => setFilterText(e.target.value)}
                            />
                        </div>

                        <Loader show={loadingUserTours} />

                        <div className="tours-content">
                            {
                                userTours.length === 0
                                    ? <p>No tours to display. maybe add a new tour <Link to='user/addtour'>here</Link></p>
                                    : filterButNoResult
                                        ? <p>Couldnt find tours that match your filter query.</p>
                                        : toursToDisplay.map(t => {
                                            return (
                                                <div className="tours-content__tour" key={t._id}>
                                                    <div><img alt={t.name} src={t.image} /></div>
                                                    <div>
                                                        <h3 className="capitalise-fl mb-0">{t.name}</h3>
                                                        <p className="mb-3 mt-1 tag">Added {format_DD_MM_YYYY(new Date(t.createdAt).getTime() / 1000)}</p>
                                                    </div>
                                                    <div
                                                        className="df f-aa-center pointer"
                                                        title="Copy to Clipboard"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(t.url);
                                                            setShowSnackbar(true);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faCopy} color='#555555' size='sm' />
                                                        <p className="ml-2" > {t.url} </p>
                                                    </div>
                                                    <div>

                                                        <a href={t.url} className="nodecoration">
                                                            <Btn sm error className="" text="download" />
                                                        </a>
                                                        <a
                                                            href={getTourViewerLink(t.url)}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="nodecoration"
                                                        >
                                                            <Btn sm className="" text="open" />
                                                        </a>
                                                    </div>
                                                </div>
                                            )
                                        })
                            }
                        </div>

                    </Col>
                </Row>
            </Container>

    );
};

export default User;