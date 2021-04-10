import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";

import React, { useEffect } from 'react';
import "@abymosa/ipsg/dist/index.css";
// import { SiteLoader } from "@abymosa/ipsg";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import MainLayout from "./hoc/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import ResetPassword from "./pages/ResetPassword";
import VerifyPasswordResetToken from "./pages/VerifyPasswordResetToken";
import Settings from "./pages/Settings";
import AddTour from "./pages/AddTour";
import container from './hoc/Container';
import { ApplicationState } from "./store/reducers";
import jwt from "jsonwebtoken";
import { DecodedToken } from "./types/types";
import { isTokenExpired, logout } from "./store/actions";

function App() {
  const dispatch = useDispatch();

  const { token } = useSelector((store: ApplicationState) => store.auth);

  useEffect(() => {

    if (token) {
      let { iat } = jwt.decode(token) as DecodedToken;

      let tokenExpiryInterval = setInterval(() => {
        if (isTokenExpired(iat)) {
          dispatch(logout());
        }
      }, 5000);

      return () => clearInterval(tokenExpiryInterval);
    }

  }, [dispatch, token]);

  return (
    <div className="App">

      {/* <SiteLoader show={loading} progress /> */}

      {/* {error ? <p>error ...</p> : null} */}

      {/* {!loading && */}
      <Switch>
        <Route exact path='/' component={container(MainLayout, User)} />
        <Route exact path='/register' component={container(MainLayout, Register)} />
        <Route exact path='/login' component={container(MainLayout, Login)} />
        <Route exact path='/user' component={container(MainLayout, User)} />
        <Route exact path='/user/settings' component={container(MainLayout, Settings)} />
        <Route exact path='/user/addtour' component={container(MainLayout, AddTour)} />
        <Route exact path='/resetpassword' component={container(MainLayout, ResetPassword)} />
        <Route exact path='/verify-password-reset-token' component={container(MainLayout, VerifyPasswordResetToken)} />

        <Route exact path='/notfound' component={container(MainLayout, NotFound)} />
        <Redirect from='*' to='/notfound' />
      </Switch>
      {/* } */}
    </div>
  )
}

export default App;
