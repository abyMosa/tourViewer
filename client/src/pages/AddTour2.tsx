import React, { useEffect, useState } from 'react';

import { Container, Col, Row, Loader, HeadLine, TextInput, Btn } from '@abymosa/ipsg';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { addTour } from "../store/actions";
import { ApplicationState } from '../store/reducers';
import { api } from "../axios";
import S3FileUpload from 'react-s3';
import { User } from "../types/types";



enum FormField {
    name,
    image,
    tour
}

interface AddTourForm {
    name: string;
    imageFile: (File | null);
    tourFile: (File | null);
}

const AddTour = () => {
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector((state: ApplicationState) => state.auth);
    const { isAddingTour } = useSelector((state: ApplicationState) => state.tours);

    const defaultForm: AddTourForm = { name: '', imageFile: null, tourFile: null }
    const [addTourForm, setAddTourForm] = useState(defaultForm);

    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setIsLoading] = useState(false);


    const [awsData, setAwsData] = useState({ imageUlr: '', tourUrl: '' });

    const validateForm = (form: AddTourForm): void => {
        let isValid = (form.name !== '' && form.imageFile && form.tourFile) ? true : false;
        setIsFormValid(isValid);
        console.log(form);
    }


    const onChange = (field: FormField, e: any) => {
        switch (field) {
            case FormField.name:
                setAddTourForm({ ...addTourForm, name: e.target.value })
                validateForm({ ...addTourForm, name: e.target.value })
                break;

            case FormField.image:
                setAddTourForm({ ...addTourForm, imageFile: e.target.files[0] })
                validateForm({ ...addTourForm, imageFile: e.target.files[0] })
                break;

            case FormField.tour:
                setAddTourForm({ ...addTourForm, tourFile: e.target.files[0] })
                validateForm({ ...addTourForm, tourFile: e.target.files[0] })
                break;

            default:
                break;
        }

    }


    const config = (isTour: boolean) => {
        return {
            bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
            dirName: isTour ? 'tours' : 'images', /* optional */
            region: 'us-east-1',
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        uploadTour();
        console.log('submit');
        // dispatch(addTour(api, addTourForm));
    }

    const uploadTour = () => {
        setIsLoading(true);




        S3FileUpload
            .uploadFile(addTourForm.tourFile, config(true))
            .then((res: any) => {
                console.log('res', res);
                // if(res.result.ok){

                // }
                setIsLoading(false);
            })
            .catch((err: any) => {
                setIsLoading(false);
                console.log(err)
            });



    }


    return (
        !isAuthenticated ? <Redirect to='/login' /> :
            <Container className="px-3">
                <Row className="" >

                    <Col md12>
                        <HeadLine title="Add Tour" />
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

                            <h2>Add an overview image</h2>

                            <input
                                type="file"

                                onChange={(e: any) => onChange(FormField.image, e)}
                            />

                            <h2>Upload Tour File</h2>

                            <input
                                type="file"
                                onChange={(e: any) => onChange(FormField.tour, e)}
                            />

                            <br />
                            <Btn
                                className="mt-4"
                                text="Add Tour"
                                // disabled={isValidForm()}
                                disabled={!isFormValid}

                            />

                        </form>

                    </Col>
                </Row>
            </Container>

    );
};

export default AddTour;