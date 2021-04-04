import React, { useState } from 'react';
import { Form, Col, Row, HTMLContent, Loader, Snackbar } from '@abymosa/ipsg';
import { useSelector } from 'react-redux';
import { Redirect, useLocation, Link } from 'react-router-dom';
import { ApplicationState } from '../store/reducers';
import { api, axiosErr } from '../axios';
import { LocationState } from "../types/types";
import { getUrlSearchParams } from '../utils/url';


const VerifyPasswordResetToken = () => {

    let location = useLocation();
    let locationState: LocationState = location.state as LocationState || { from: { pathname: "/user" } };
    let params = getUrlSearchParams(window.location.href);


    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    let [password, setPassword] = useState('');
    const { isAuthenticated } = useSelector((state: ApplicationState) => state.auth);

    let elements = [
        { slug: 'password', type: 'password', label: 'new password', value: null, grid: 'col--sm--12', rules: ['required'] },
    ];

    let onSubmit = () => {

        const resetData = {
            password: password,
            token: params.token,
            user: params.id
        }

        setError(null);
        setLoading(true);

        api.post('/auth/verifyResetToken', resetData)
            .then(response => {
                if (response.status === 200) {
                    setIsRegistered(true);
                    setError(null);
                    setPassword('');
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
            !params.token || !params.id ? <p>sorry egergergerg</p> :
                <Row className="mt-6" >
                    <Col md4 mdOffset4>
                        <h1>Enter New Password</h1>

                        <Snackbar
                            show={showSnackbar}
                            title="Successfull password reset"
                            message="Password has been reset Successfully, you can now login."
                            onComplete={() => setShowSnackbar(false)}
                            timeOut={6000}
                        />
                        <Loader show={loading} />
                        {!error ? null : <HTMLContent className="mb-3 error" content={error} />}
                        {!isRegistered ? null : <p>Password has been reset Successfully, you can now <Link to='/login'>login</Link>.</p>}
                        <Form
                            elements={elements}
                            values={{ password }}
                            onChange={(v: any) => setPassword(v.password)}
                            onSubmit={onSubmit}
                            blockBtn={true}
                            btnSize="lg"
                        />

                        <p className="ta-center">have an account <Link to='/login'>Click here</Link> to login</p>

                    </Col>
                </Row>
    );
};

export default VerifyPasswordResetToken;