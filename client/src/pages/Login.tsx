import React, { FunctionComponent, useState } from 'react';
import { Form, Col, Row, HTMLContent, Loader } from 'inspirepress-styleguide';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation, Link } from 'react-router-dom';
import { login } from "../store/actions";
import { ApplicationState } from '../store/reducers';
import { api } from '../axios';
import { LocationState, UserLoginFormData } from "../types/types";


const Login: FunctionComponent = () => {
    let location = useLocation();
    let locationState: LocationState = location.state as LocationState || { from: { pathname: "/user" } };

    let defaultForm: UserLoginFormData = { email: '', password: '' };

    let [form, setForm] = useState(defaultForm);
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector((state: ApplicationState) => state.auth);


    let elements = [
        { slug: 'email', type: 'text', label: 'email', value: null, grid: 'col--sm--12', rules: ['required', 'email'] },
        { slug: 'password', type: 'password', label: 'password', value: null, grid: 'col--sm--12', rules: ['required'] },
    ];

    let onSubmit = () => {
        dispatch(login(api, form));
    }

    return (
        isAuthenticated ? <Redirect to={locationState.from.pathname} /> :
            <Row className="mt-6" >
                <Col md4 mdOffset4>
                    <h1>Login</h1>

                    <Loader show={loading} />
                    {!error ? null : <HTMLContent className="mb-3 error" content={error} />}

                    <Form
                        elements={elements}
                        values={form}
                        onChange={(v: UserLoginFormData) => setForm(v)}
                        onSubmit={onSubmit}
                        blockBtn={true}
                        btnSize="lg"
                    />
                    <p className="ta-center mt-5">Forgot password <Link to='/resetpassword'>Click here</Link></p>
                    <p className="ta-center mt-4">Dont have an account, why not  <Link to='/register'>register</Link></p>

                </Col>
            </Row>
    );
};

export default Login;