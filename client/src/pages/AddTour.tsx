import React, { useEffect, useState } from 'react';

import { Container, Col, Row, Loader, HeadLine, TextInput, Btn, Snackbar } from 'inspirepress-styleguide';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { addTour } from "../store/actions";
import { ApplicationState } from '../store/reducers';
import { api, axiosErr } from "../axios";
import axios from 'axios';
import S3FileUpload from 'react-s3';
import { User, EventType } from "../types/types";
import ProgressBar from '../components/ProgressBar';




enum FormField {
    name,
    tour,
    image
}

interface AddTourForm {
    name: string;
    tourFile: (File | null);
    imageFile: (File | null);
}



const AddTour = () => {
    const dispatch = useDispatch();

    const [showSnackbar, setShowSnackbar] = useState(false);

    const { isAuthenticated, user } = useSelector((state: ApplicationState) => state.auth);
    const { isAddingTour } = useSelector((state: ApplicationState) => state.tours);

    const defaultForm: AddTourForm = { name: '', tourFile: null, imageFile: null }
    const [addTourForm, setAddTourForm] = useState(defaultForm);

    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setIsLoading] = useState(false);

    const [progress, setProgress] = useState({ image: 0, tour: 0 });
    const [events, setEvents] = useState<EventType[]>([]);

    const validateForm = (form: AddTourForm): void => {
        let isValid = (form.name !== '' && form.tourFile && form.imageFile) ? true : false;
        setIsFormValid(isValid);
    }

    const onChange = (field: FormField, e: any) => {
        switch (field) {
            case FormField.name:
                setAddTourForm({ ...addTourForm, name: e.target.value })
                validateForm({ ...addTourForm, name: e.target.value })
                break;

            case FormField.tour:
                setAddTourForm({ ...addTourForm, tourFile: e.target.files[0] })
                validateForm({ ...addTourForm, tourFile: e.target.files[0] })
                console.log(e.target.files[0]);
                break;

            case FormField.image:
                setAddTourForm({ ...addTourForm, imageFile: e.target.files[0] })
                validateForm({ ...addTourForm, imageFile: e.target.files[0] })
                console.log(e.target.files[0]);
                break;

            default:
                break;
        }

    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        uploadTour();
    }

    const getFileParts = (name: string, file: File, prefix: string) => {
        let fileParts = file.name.split('.');
        let fileName = name.replaceAll(' ', '').toLowerCase();
        let fileType = fileParts[fileParts.length - 1];
        return { fileName: `${prefix}/${fileName}`, fileType }
    }

    const uploadTour = () => {
        setIsLoading(true);

        if (addTourForm.tourFile && addTourForm.imageFile) {

            setEvents(event => [...event, EventType.UploadStarted, EventType.PreparingFiles]);

            let imageFile = getFileParts(addTourForm.name, addTourForm.imageFile, 'images');
            let tourFile = getFileParts(addTourForm.name, addTourForm.tourFile, 'tours');

            api.post('/tour/s3sign', { image: imageFile, tour: tourFile })
                .then(res => {
                    setEvents(event => [...event, EventType.S3signSuccessful]);
                    console.log('res 1', res);

                    let imageSignedRequest = res.data.aws.image.signedRequest;
                    let imageUrl = res.data.aws.image.url;

                    let tourSignedRequest = res.data.aws.tour.signedRequest;
                    let tourUrl = res.data.aws.tour.url;


                    console.log("Recieved image signed request " + imageSignedRequest);
                    console.log("Recieved tour signed request " + tourSignedRequest);



                    setEvents(event => [...event, EventType.UploadingImage]);
                    // upload image
                    var imageOptions = {
                        headers: { 'Content-Type': imageFile.fileType },
                        onUploadProgress: (progressEvent: any) => setProgress(p => ({ ...p, image: progressEvent.loaded }))
                    };

                    axios.put(imageSignedRequest, addTourForm.imageFile, imageOptions)
                        .then(imageUploadRes => {

                            console.log("Response from s3 uploading image", imageUploadRes)



                            setEvents(event => [...event, EventType.UploadingTour]);
                            var options = {
                                headers: { 'Content-Type': tourFile.fileType },
                                onUploadProgress: (progressEvent: any) => setProgress(p => ({ ...p, tour: progressEvent.loaded }))
                            };

                            axios.put(tourSignedRequest, addTourForm.tourFile, options)
                                .then(result => {
                                    console.log("Response from s3", result)

                                    setEvents(event => [...event, EventType.UpdatingRecords]);

                                    let tour = { name: addTourForm.name, image: imageUrl, url: tourUrl, user: user?._id };

                                    api.post('/tour', tour)
                                        .then(response => {
                                            console.log('s3sign ++ upload to aws ++ store in db ', response);
                                            setIsLoading(false);
                                            setEvents(event => [...event, EventType.UploadSucceeded]);
                                            // setAddTourForm(defaultForm)
                                            setShowSnackbar(true);
                                        })
                                        .catch(er => {
                                            console.log('failed to store in db', er);
                                            setIsLoading(false);
                                            setEvents(event => [...event, EventType.UploadFailed]);
                                        });

                                })
                                .catch(error => {
                                    // alert("ERROR " + JSON.stringify(error));
                                    console.log('ERROR', error);
                                    console.log('message', axiosErr(error));
                                    setIsLoading(false);
                                    setEvents(event => [...event, EventType.UploadFailed]);
                                })

                        })
                        .catch(imageUploadErr => {
                            console.log('imageUploadErr', imageUploadErr);
                            console.log('message', axiosErr(imageUploadErr));
                            setIsLoading(false);
                            setEvents(event => [...event, EventType.UploadFailed]);
                        })


                })
                .catch(err => {
                    console.log('err', err);
                    setIsLoading(false);
                    setEvents(event => [...event, EventType.UploadFailed]);
                })

        }

    }

    const isCurrentEvent = (event: EventType) => {
        let index = events.findIndex(e => e === event);
        return index === events.length - 1 && event !== EventType.UploadSucceeded;

    }

    const formatLog = (event: (EventType | null), text: string): JSX.Element => {
        return (
            <div className="df f-jc-start f-aa-center">
                <div style={{ width: "30px" }}>
                    {event === null ? null :
                        isCurrentEvent(event)
                            ? <div className="spinner"></div>
                            : "✔"
                    }
                </div>
                <div className="ml-2"><p>{text}</p></div>
            </div>
        )
    }

    const getEventContent = (event: EventType): JSX.Element => {

        switch (event) {
            case EventType.PreparingFiles:
                return formatLog(event, 'Preparing files');


            case EventType.UploadStarted:
                return formatLog(event, 'Upload started');

            case EventType.S3signSuccessful:
                return formatLog(event, 'Getting AWS S3 sign request');

            case EventType.UploadingImage:
                return (
                    <div>
                        {formatLog(event, `Uploading image (${progress.image} - ${addTourForm.imageFile?.size})`)}
                        {addTourForm.imageFile &&
                            <div className="df">
                                <div style={{ width: "38px" }}></div>
                                <ProgressBar
                                    show={progress.image !== 0}
                                    position={progress.image}
                                    total={addTourForm.imageFile.size}
                                />
                            </div>
                        }
                    </div>
                )

            case EventType.UploadingTour:
                return (
                    <div>
                        {formatLog(event, 'Uploading Tour')}
                        {formatLog(null, `Large file, pleasse be patient (${progress.tour} - ${addTourForm.tourFile?.size})`)}
                        {addTourForm.tourFile &&
                            <div className="df">
                                <div style={{ width: "38px" }}></div>
                                <ProgressBar
                                    show={progress.tour !== 0}
                                    position={progress.tour}
                                    total={addTourForm.tourFile.size}
                                />
                            </div>
                        }
                    </div>
                )

            case EventType.UpdatingRecords:
                return formatLog(event, 'Nearly there, updating our records, wont take long')

            case EventType.UploadSucceeded:
                return formatLog(event, 'Upload Succeeded')

            case EventType.UploadFailed:
                return formatLog(event, 'Upload Failed :(')


            default:
                return <span></span>;
        }

    }

    return (
        !isAuthenticated ? <Redirect to='/login' /> :
            <Container className="px-3 addTour-container">
                <Snackbar
                    show={showSnackbar}
                    message="File uploaded Succefully"
                    onComplete={() => setShowSnackbar(false)}
                    timeOut={3000}
                />

                <Row className="" >

                    <Col md7 className="pr-3">
                        <HeadLine title="Add Tour" className="mb-4 mt-1" />
                        <Loader show={isAddingTour || loading} />

                        <form onSubmit={onSubmit}>

                            <TextInput
                                name="name"
                                value={addTourForm.name}
                                type="text"
                                label="title"
                                errors={[]}

                                onChange={(e: any) => onChange(FormField.name, e)}
                            />

                            <h4 className="mt-5 capitalise">Upload preview image</h4>

                            <input
                                type="file"
                                disabled={isAddingTour || loading}
                                onChange={(e: any) => onChange(FormField.image, e)}
                            />

                            <h4 className="mt-5 capitalise">Upload Tour File</h4>

                            <input
                                type="file"
                                disabled={isAddingTour || loading}
                                onChange={(e: any) => onChange(FormField.tour, e)}
                            />

                            <br />
                            <Btn block className="mt-5" text="Add Tour" disabled={!isFormValid || isAddingTour || loading} />

                        </form>

                    </Col>
                    <Col md5 className="uploadResult">
                        <div className="mt-5">
                            {
                                events.length === 0 ? null :
                                    events.map(event => getEventContent(event))
                            }
                        </div>
                    </Col>
                </Row>
            </Container>

    );
};

export default AddTour;