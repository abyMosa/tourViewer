import React, { useState } from 'react';
import { Form, Col, Row, HTMLContent, Loader, Snackbar } from '@abymosa/ipsg';
import { useSelector } from 'react-redux';
import { Redirect, useLocation, Link } from 'react-router-dom';
import { ApplicationState } from '../store/reducers';
import { api, axiosErr } from '../axios';
import { LocationState, UserRegistrationFormData } from "../types/types";


const Register = () => {
    let location = useLocation();
    let locationState: LocationState = location.state as LocationState || { from: { pathname: "/user" } };
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    let defaultForm: UserRegistrationFormData = { title: "", firstName: '', lastName: '', email: '', password: '' };

    let [form, setForm] = useState(defaultForm);
    const { isAuthenticated } = useSelector((state: ApplicationState) => state.auth);

    const options = [
        { key: 'mr', text: 'Mr' },
        { key: 'mrs', text: 'Mrs' },
        { key: 'miss', text: 'Miss' },
        { key: 'ms', text: 'Ms' },
        { key: 'dr', text: 'Dr' },
    ];

    let elements = [
        { slug: 'title', type: 'select', label: 'title', value: null, grid: 'col--sm--6', options: options },
        { slug: 'email', type: 'text', label: 'email', value: null, grid: 'col--sm--6', rules: ['required', 'email'] },
        { slug: 'firstName', type: 'text', label: 'First Name', value: null, grid: 'col--sm--12', rules: ['required'] },
        { slug: 'lastName', type: 'text', label: 'Last Name', value: null, grid: 'col--sm--12', rules: ['required'] },
        { slug: 'password', type: 'password', label: 'password', value: null, grid: 'col--sm--12', rules: ['required'] },
    ];

    let onSubmit = () => {
        // dispatch(register(api, form));
        setError(null);
        setLoading(true);

        api.post('/auth/register', form)
            .then(response => {
                if (response.status === 200) {
                    setIsRegistered(true);
                    setError(null);
                    setForm(defaultForm);
                    setShowSnackbar(true);

                } else {
                    setError('Unexpexted Error Occured');
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(axiosErr(err));
                setLoading(false);
            });
    }

    return (
        isAuthenticated ? <Redirect to={locationState.from.pathname} /> :
            <Row className="mt-6" >
                <Col md4 mdOffset4>
                    <h1>Register</h1>

                    <Snackbar
                        show={showSnackbar}
                        title="Registered Successfully"
                        message="Registered Successfully, you can login."
                        onComplete={() => setShowSnackbar(false)}
                        timeOut={6000}
                    />
                    <Loader show={loading} />
                    {!error ? null : <HTMLContent className="mb-3 error" content={error} />}
                    {!isRegistered ? null : <p>Registered successfully <Link to='/login'>click here</Link> to login</p>}
                    <Form
                        elements={elements}
                        values={form}
                        onChange={(v: UserRegistrationFormData) => setForm(v)}
                        onSubmit={onSubmit}
                        blockBtn={true}
                        btnSize="lg"
                    />

                    <p className="ta-center mt-4">Already a customer? <Link to='/login'>Click here</Link> to login</p>

                </Col>
            </Row>
    );
};

export default Register;