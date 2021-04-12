import React, { useState } from 'react';

import { Container, Col, Row, Loader, HeadLine, TextInput, Btn, Snackbar } from '@abymosa/ipsg';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ApplicationState } from '../store/reducers';
import { api, axiosErr } from "../axios";
import axios from 'axios';
import { EventType } from "../types/types";
import ProgressBar from '../components/ProgressBar';
import path from "path";
import { spawn } from 'node:child_process';


enum FormField {
    name,
    tour,
}

interface AddTourForm {
    name: string;
    tourFile: (File | null);
}


const AddTour = () => {
    // const dispatch = useDispatch();

    const [showSnackbar, setShowSnackbar] = useState(false);

    const { isAuthenticated, user } = useSelector((state: ApplicationState) => state.auth);
    const { isAddingTour } = useSelector((state: ApplicationState) => state.tours);

    const defaultForm: AddTourForm = { name: '', tourFile: null }
    const [addTourForm, setAddTourForm] = useState(defaultForm);

    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setIsLoading] = useState(false);

    const [progress, setProgress] = useState([0, 0]);
    const [events, setEvents] = useState<EventType[]>([]);

    const validateForm = (form: AddTourForm): void => {
        let isValid = (form.name !== '' && form.tourFile) ? true : false;
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

            default:
                break;
        }

    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        uploadTour();
    }

    // const getFileParts = (name: string, file: File, prefix: string) => {
    //     let fileParts = file.name.split('.');
    //     let fileName = name.replaceAll(' ', '').toLowerCase();
    //     let fileType = fileParts[fileParts.length - 1];
    //     return { fileName: `${prefix}/${fileName}`, fileType }
    // }

    const uploadTour = () => {
        setEvents([]);
        setIsLoading(true);

        if (addTourForm.tourFile && user) {

            setEvents(event => [...event, EventType.UploadStarted, EventType.PreparingFiles]);

            setEvents(event => [...event, EventType.UploadingTour]);
            var options = {
                headers: { 'Content-Type': "multipart/form-data" },
                onUploadProgress: (progressEvent: any) => {
                    setProgress([progressEvent.loaded, progressEvent.total]);

                    if (progressEvent.loaded >= progressEvent.total) {
                        setEvents(event => [...event, EventType.UpdatingRecords]);
                    }
                }
            };

            var bodyFormData = new FormData();
            bodyFormData.append('tour', addTourForm.tourFile);
            bodyFormData.append('name', addTourForm.name);
            bodyFormData.append('user', user._id);

            api.post('/tour', bodyFormData, options)
                .then(result => {
                    console.log("upload complete", result);
                    setIsLoading(false);
                    setEvents(event => [...event, EventType.UploadSucceeded]);
                    setShowSnackbar(true);

                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                    setEvents(event => [...event, EventType.UploadFailed]);
                })

        }

    }

    const isCurrentEvent = (event: EventType) => {
        let index = events.findIndex(e => e === event);
        return index === events.length - 1 && event !== EventType.UploadSucceeded && event !== EventType.UploadFailed;

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

            case EventType.UploadingTour:
                return (
                    <div>
                        {formatLog(event, 'Uploading Tour')}
                        {formatLog(null, `Large file, pleasse be patient (${progress[0]} - ${progress[1]})`)}
                        {addTourForm.tourFile &&
                            <div className="df">
                                <div style={{ width: "38px" }}></div>
                                <ProgressBar
                                    show={progress[0] !== 0}
                                    position={progress[0]}
                                    total={progress[1]}
                                />
                            </div>
                        }
                    </div>
                )

            case EventType.UpdatingRecords:
                return formatLog(event, 'Nearly there, decompressing file and updating our records.')

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

                            <h4 className="mt-5 capitalise">Upload Tour File</h4>

                            <input
                                type="file"
                                disabled={isAddingTour || loading}
                                onChange={(e: any) => onChange(FormField.tour, e)}
                                accept=".zip"
                            />

                            <br />
                            <Btn block className="mt-5" text="Add Tour" disabled={!isFormValid || isAddingTour || loading} />

                        </form>

                    </Col>
                    <Col md5 className="uploadResult">
                        <div className="mt-5">
                            {
                                events.length === 0 ? null :
                                    events.map((event, i) => <span key={i}>{getEventContent(event)}</span>)
                            }
                        </div>
                    </Col>
                </Row>
            </Container>

    );
};

export default AddTour;