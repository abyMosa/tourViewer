import React, { useState } from 'react';

import { Container, Col, Row, Loader, HeadLine, TextInput, Btn, Snackbar } from '@abymosa/ipsg';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ApplicationState } from '../store/reducers';
import { api, axiosErr } from "../axios";
import { EventType } from "../types/types";
import ProgressBar from '../components/ProgressBar';
import SparkMD5 from 'spark-md5';

enum FormField {
    name,
    description,
    tour,
}

interface AddTourForm {
    name: string;
    description: string;
    tourFile: (File | null);
}

type BlobSlice = (start?: number | undefined, end?: number | undefined, contentType?: string | undefined) => Blob

const AddTour = () => {
    // const dispatch = useDispatch();

    const [showSnackbar, setShowSnackbar] = useState(false);

    const { isAuthenticated, user } = useSelector((state: ApplicationState) => state.auth);
    const { isAddingTour } = useSelector((state: ApplicationState) => state.tours);

    const defaultForm: AddTourForm = { name: '', description: '', tourFile: null }
    const [addTourForm, setAddTourForm] = useState(defaultForm);

    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setIsLoading] = useState(false);

    const [progress, setProgress] = useState([0, 0]);
    const [events, setEvents] = useState<EventType[]>([]);

    const [currentAndTotalchunks, setCurrentAndTotalchunks] = useState([0, 0]);


    const validateForm = (form: AddTourForm): void => {
        let isValid = (form.tourFile) ? true : false;
        setIsFormValid(isValid);
    }

    const onChange = (field: FormField, e: any) => {
        switch (field) {
            case FormField.name:
                setAddTourForm({ ...addTourForm, name: e.target.value })
                validateForm({ ...addTourForm, name: e.target.value })
                break;

            case FormField.description:
                setAddTourForm({ ...addTourForm, description: e.target.value })
                validateForm({ ...addTourForm, description: e.target.value })
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

    const hashFile = (file: File, chunkSize: number, blobSlice: BlobSlice) => {
        return new Promise((resolve, reject) => {

            const chunks = Math.ceil(file.size / chunkSize);
            let currentChunk = 0;
            const spark = new SparkMD5.ArrayBuffer();
            const fileReader = new FileReader();
            function loadNext() {
                const start = currentChunk * chunkSize;
                const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
                fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
            }
            fileReader.onload = e => {
                if (e.target?.result) {
                    spark.append(e.target.result as ArrayBuffer); // Append array buffer
                    currentChunk += 1;
                    if (currentChunk < chunks) {
                        loadNext();
                    } else {
                        console.log('finished loading');
                        const result = spark.end();
                        // If result s are used as hash values only, if the contents of the file are the same and the names are different
                        // You cannot keep two files if you want to.So add the file name.
                        const sparkMd5 = new SparkMD5();
                        sparkMd5.append(result);
                        sparkMd5.append(file.name);
                        const hexHash = sparkMd5.end();
                        resolve(hexHash);
                    }
                }
            };
            fileReader.onerror = () => {
                console.warn('File reading failed!');
                reject('File reading failed!');
            };
            loadNext();
        }).catch(err => {
            console.log(err);
            // reject(err.message || 'error');
        });
    }

    const uploadTour = async () => {
        setEvents([]);
        setIsLoading(true);

        if (addTourForm.tourFile && user) {

            setEvents(event => [...event, EventType.UploadStarted, EventType.PreparingFiles]);
            setEvents(event => [...event, EventType.CreatingChunks]);

            const chunkSize = 250 * 1024 * 1024; // The size of each chunk, set to 250 Megabyte
            const blobSlice = File.prototype.slice;  // Use the Blob.slice method to split the file.

            const file = addTourForm.tourFile;
            if (!file) {
                alert('No file was obtained');
                return;
            }
            const blockCount = Math.ceil(file.size / chunkSize); // Total number of slices
            const axiosPromiseArray = []; // axiosPromise array
            const hash = await hashFile(file, chunkSize, blobSlice); //File hash 
            // After obtaining the file hash, if breakpoint continuation is required, it can be checked in the background based on the hash value.
            // See if the file has been uploaded and if the transfer is complete and the slices have been uploaded.
            console.log(hash);

            for (let i = 0; i < blockCount; i++) {

                if (i === 0) {
                    setEvents(event => [...event, EventType.UploadingTour]);
                }
                setCurrentAndTotalchunks([i + 1, blockCount]);

                const start = i * chunkSize;
                const end = Math.min(file.size, start + chunkSize);
                // Build a form
                const form = new FormData();
                form.append('file', blobSlice.call(file, start, end));
                form.append('name', file.name);
                form.append('total', blockCount.toString());
                form.append('index', i.toString());
                form.append('size', file.size.toString());
                form.append('hash', hash as string);
                // ajax submits a slice, where content-type is multipart/form-data
                const axiosOptions = {
                    onUploadProgress: (progressEvent: any) => {
                        // Progress in processing uploads
                        // console.log(blockCount, i, e, file);
                        setProgress([progressEvent.loaded, progressEvent.total]);

                        if (progressEvent.loaded >= progressEvent.total && i === blockCount - 1) {
                            setEvents(event => [...event, EventType.UpdatingRecords]);
                        }
                    },
                };
                // Add to Promise Array
                axiosPromiseArray.push(api.post('/tourchunk', form, axiosOptions));
            }
            // Request merge of slice files after all slice uploads
            await Promise
                .all(axiosPromiseArray)
                .then(() => {
                    // Merge chunks
                    const data = {
                        size: file.size,
                        name: file.name,
                        total: blockCount,
                        hash,
                        tourName: addTourForm.name,
                        description: addTourForm.description,
                        user: user._id,
                    };
                    api.post('/mergetourchunks', data)
                        .then(res => {
                            console.log("upload complete", res);
                            setIsLoading(false);
                            setEvents(event => [...event, EventType.UploadSucceeded]);
                            setShowSnackbar(true);
                        })
                        .catch(err => {
                            console.log(axiosErr(err));
                            setIsLoading(false);
                            setEvents(event => [...event, EventType.UploadFailed]);
                        });
                });



            // var options = {
            //     headers: { 'Content-Type': "multipart/form-data" },
            //     onUploadProgress: (progressEvent: any) => {
            //         setProgress([progressEvent.loaded, progressEvent.total]);

            //         if (progressEvent.loaded >= progressEvent.total) {
            //             setEvents(event => [...event, EventType.UpdatingRecords]);
            //         }
            //     }
            // };

            // var bodyFormData = new FormData();
            // bodyFormData.append('tour', addTourForm.tourFile);
            // bodyFormData.append('name', addTourForm.name);
            // bodyFormData.append('description', addTourForm.description);
            // bodyFormData.append('user', user._id);

            // api.post('/tour', bodyFormData, options)
            //     .then(result => {
            //         console.log("upload complete", result);
            //         setIsLoading(false);
            //         setEvents(event => [...event, EventType.UploadSucceeded]);
            //         setShowSnackbar(true);

            //     })
            //     .catch(err => {
            //         console.log(axiosErr(err));
            //         setIsLoading(false);
            //         setEvents(event => [...event, EventType.UploadFailed]);
            //     })
        }

    }

    const isCurrentEvent = (event: EventType) => {
        let index = events.findIndex(e => e === event);
        return index === events.length - 1 && event !== EventType.UploadSucceeded && event !== EventType.UploadFailed;

    }

    const formatBytes = (bytes: number, decimals: number = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
                        {formatLog(event, `Uploading Tour chunk (total of ${currentAndTotalchunks[1]} chunks)  ${formatBytes(progress[0])} - ${formatBytes(progress[1])}`)}
                        {/* {formatLog(null, `Large file, please be patient (${formatBytes(progress[0])} - ${formatBytes(progress[1])})`)} */}
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

            case EventType.CreatingChunks:
                return formatLog(event, 'Creating Chunks! spliting zip file into smaller chunks for more reliable upload.')

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

                        <form onSubmit={onSubmit} encType="multipart/form-data">

                            <TextInput
                                name="name"
                                value={addTourForm.name}
                                type="text"
                                label="title"
                                errors={[]}

                                onChange={(e: any) => onChange(FormField.name, e)}
                            />

                            <br />
                            <br />

                            <TextInput
                                name="name"
                                value={addTourForm.description}
                                type="textarea"
                                label="description"
                                errors={[]}
                                onChange={(e: any) => onChange(FormField.description, e)}
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