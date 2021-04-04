import React, { FunctionComponent } from 'react';
import { Toolbar, Logo } from "@abymosa/ipsg";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from '../store/reducers';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/actions';
import { ReactComponent as LogoSvg } from "../assets/img/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Header: FunctionComponent = () => {

    const { user } = useSelector((state: ApplicationState) => state.auth);
    const dispatch = useDispatch();

    return (
        <div>
            <Toolbar lg className="mb-3">
                <Logo svg={LogoSvg} render={(x: FunctionComponent) => <NavLink to="/">{x}</NavLink>} />
                {
                    user
                        ?
                        <ul className="ab-navigation-links">
                            <li>
                                <NavLink exact to="/user">
                                    <div className="df f-aa-center">
                                        <div className="user-circle"><FontAwesomeIcon icon={faUser} /></div>
                                        <div>{user.firstName}</div>
                                        {/* <div className="ml-2"><FontAwesomeIcon icon={faCaretDown} /></div> */}
                                    </div>
                                </NavLink>
                            </li>
                            <li className="pointer" onClick={() => dispatch(logout())}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </li>
                        </ul>
                        :
                        <ul className="ab-navigation-links">
                            <li><NavLink exact to="/login"><FontAwesomeIcon icon={faSignInAlt} /></NavLink></li>
                            {/* <li><NavLink exact to="/register">register</NavLink></li> */}
                        </ul>
                }

            </Toolbar>
        </div>
    );
};

export default Header;