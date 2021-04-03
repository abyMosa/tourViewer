import React, { useEffect } from 'react';
import { Btn, Container, Col, Row, Loader, HeadLine } from 'inspirepress-styleguide';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { fetchUserTours } from "../store/actions";
import { ApplicationState } from '../store/reducers';
import { api } from "../axios";

const User = () => {


    const { isAuthenticated, user } = useSelector((state: ApplicationState) => state.auth);
    const { userTours, loadingUserTours } = useSelector((state: ApplicationState) => state.tours);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserTours(api, user._id));
        }
    }, [user]);


    return (
        !isAuthenticated ? <Redirect to='/login' /> :
            <Container className="px-3 user-container">
                <Row className="" >

                    <Col md12>
                        <div className="df f-aa-end">
                            <HeadLine title="Tours" />
                            <Link to='user/addtour'><Btn className="ml-3" text="Add New" sm /></Link>
                        </div>

                        {/* <div className="uploadSeaction">

                        </div> */}

                        {/* <Link to='user/addtour'>Add new</Link> */}
                        <Loader show={loadingUserTours} />
                        {
                            userTours.length === 0
                                ? <p>No tours to display. maybe add a new tour <Link to='user/addtour'>here</Link></p>
                                : userTours.map(t => {
                                    return (
                                        <div key={t._id}>
                                            <img src={t.image} />
                                            <p>{t._id}</p>
                                            <p>{t.name}</p>
                                            <p>{t.url}</p>
                                            <p>{t.user}</p>
                                            <p>{t.image}</p>

                                        </div>
                                    )
                                })
                        }

                    </Col>
                </Row>
            </Container>

    );
};

export default User;