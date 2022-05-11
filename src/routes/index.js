import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "../components/layout";
import actions from "../Common-Service";

function LandingRoute() {
    return (
        <Fragment>
            <Switch>
                <Route
                    path={'/login'}
                    exact
                    render={(props) => (<Layout path="login" {...props}/>)}
                />
                <Route
                    path={'/signup'}
                    exact
                    render={(props) => (<Layout path="signup" {...props}/>)}
                />
                <Route path="/" render={ (props) => !actions.isAuthenticated() ? 
                    <Redirect from="*" to={'/login'} /> : 
                    <Layout path="/" {...props}/>} />
            </Switch>
        </Fragment>
    );
}

export default LandingRoute;