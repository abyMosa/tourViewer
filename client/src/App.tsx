import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";

import React from 'react';
import "inspirepress-styleguide/dist/index.css";
// import { SiteLoader } from "inspirepress-styleguide";
// import { useSelector } from "react-redux";
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

// import { ApplicationState } from "./store/reducers";

function App() {

  // const { loading, error } = useSelector((store: ApplicationState) => store.auth);

  return (
    <div className="App">

      {/* <SiteLoader show={loading} progress /> */}

      {/* {error ? <p>error ...</p> : null} */}

      {/* {!loading && */}
      <Switch>
        {/* <Route path='/' component={container(MainLayout, Login)} /> */}
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
