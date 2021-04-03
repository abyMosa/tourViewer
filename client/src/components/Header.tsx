import React, { FunctionComponent } from 'react';
import { Toolbar, Logo } from "inspirepress-styleguide";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from '../store/reducers';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/actions';

const Header: FunctionComponent = () => {

    const { user } = useSelector((state: ApplicationState) => state.auth);
    const dispatch = useDispatch();

    return (
        <div>
            <Toolbar lg >
                <Logo render={(x: FunctionComponent) => <NavLink to="/">{x}</NavLink>} />
                {
                    user
                        ?
                        <ul className="ab-navigation-links">
                            <li><NavLink exact to="/user">user</NavLink></li>
                            <li className="pointer" onClick={() => dispatch(logout())}>logout</li>
                        </ul>
                        :
                        <ul className="ab-navigation-links">
                            <li><NavLink exact to="/login">Login</NavLink></li>
                            <li><NavLink exact to="/register">register</NavLink></li>
                        </ul>
                }

            </Toolbar>
        </div>
    );
};

export default Header;