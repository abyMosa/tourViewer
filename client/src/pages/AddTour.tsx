import React, { useEffect, useState } from 'react';

import { Container, Col, Row, Loader, HeadLine, TextInput, Btn } from 'inspirepress-styleguide';
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
        setEvents(event => [...event, EventType.UploadStarted]);
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

            setEvents(event => [...event, EventType.PreparingFiles]);
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

    const getEventContent = (event: EventType): JSX.Element => {

        switch (event) {
            case EventType.PreparingFiles:
                return (<p>Preparing files ....</p>)

            case EventType.UploadStarted:
                return <p>Upload Started ....</p>

            case EventType.S3signSuccessful:
                return <p>Getting Aws S3 Sign request..</p>

            case EventType.UploadingImage:
                return (
                    <div>
                        <p>Uploading Image...</p>
                        {addTourForm.imageFile &&
                            <ProgressBar
                                show={progress.image !== 0}
                                position={progress.image}
                                total={addTourForm.imageFile.size}
                            />
                        }
                    </div>
                )

            case EventType.UploadingTour:
                return (
                    <div>
                        <p>Uploading Tour...</p>
                        <p>Large file, pleasse be patient.</p>
                        {addTourForm.tourFile &&
                            <ProgressBar
                                show={progress.tour !== 0}
                                position={progress.tour}
                                total={addTourForm.tourFile.size}
                            />
                        }
                    </div>
                )

            case EventType.UpdatingRecords:
                return <p>Nearly there, updating our records, wont take long.</p>


            case EventType.UploadSucceeded:
                return <p>Upload Succeeded.</p>

            case EventType.UploadFailed:
                return (
                    <div>
                        <p>Upload Failed :( </p>
                        <p>Maybe try again. </p>
                    </div>
                )


            default:
                return <span></span>;
        }

    }

    return (
        !isAuthenticated ? <Redirect to='/login' /> :
            <Container className="px-3 addTour-container">
                <Row className="" >

                    <Col md6 className="pr-3">
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

                            <h2 className="mt-5">Upload preview image</h2>

                            <input
                                type="file"
                                onChange={(e: any) => onChange(FormField.image, e)}
                            />

                            <h2 className="mt-5">Upload Tour File</h2>

                            <input
                                type="file"
                                onChange={(e: any) => onChange(FormField.tour, e)}
                            />

                            <br />
                            <Btn className="mt-6" text="Add Tour" disabled={!isFormValid} />

                        </form>

                    </Col>
                    <Col md6 className="uploadResult">
                        {
                            events.length === 0 ? <p>Upload hasnt started yet</p> :
                                events.map(event => getEventContent(event))
                        }
                    </Col>
                </Row>
            </Container>

    );
};

export default AddTour;