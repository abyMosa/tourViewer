import React, { FunctionComponent, useState } from 'react';
import { Form, Col, Row, HTMLContent, Loader, Snackbar } from '@abymosa/ipsg';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { ApplicationState } from '../store/reducers';
import { api, axiosErr } from '../axios';
import { LocationState } from "../types/types";


const ResetPassword: FunctionComponent = () => {
    let location = useLocation();
    let locationState: LocationState = location.state as LocationState || { from: { pathname: "/user" } };

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    let [email, setEmail] = useState('');
    const { isAuthenticated } = useSelector((state: ApplicationState) => state.auth);

    let elements = [
        { slug: 'email', type: 'text', label: 'email', value: null, grid: 'col--sm--12', rules: ['required', 'email'] },
    ];

    let onSubmit = () => {
        setLoading(true);
        api.post('/auth/resetpassword', { email, origin: `${window.location.origin}/verify-password-reset-token` })
            .then(response => {
                if (response.status === 200) {
                    setIsEmailSent(true);
                    setError(null);
                    setEmail('');
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
                    <h1>Reset Password</h1>

                    <Snackbar
                        show={showSnackbar}
                        title="Email Sent"
                        message="Emil sent Successfully, check your email and follow the link to reset your password."
                        onComplete={() => setShowSnackbar(false)}
                        timeOut={6000}
                    />

                    <Loader show={loading} />
                    {!error ? null : <HTMLContent className="mb-3 error" content={error} />}
                    {!isEmailSent ? null : <p>Emil sent Successfully, check your email and follow the link to reset your password.</p>}

                    <Form
                        elements={elements}
                        values={{ email }}
                        onChange={(v: any) => setEmail(v.email)}
                        onSubmit={onSubmit}
                        blockBtn={true}
                        btnSize="lg"
                    />
                    {/* <p className="ta-center">Forgot password <Link to='/resetpassword'>Click here</Link></p> */}

                </Col>
            </Row>
    );
};

export default ResetPassword;