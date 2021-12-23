import React from 'react';

// React Router
import { Route, Switch, withRouter } from "react-router-dom";


// Pages
import Home from '../pages/Home';

// Components
import AuthRoutes from './AuthRoutes';
import ProtectedRoutes from './ProtectedRoutes';

import SignIn from '../components/SignIn/SignIn.jsx';
import Dashboard from '../components/Dashboard/Dashboard.js';


const routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <ProtectedRoutes path="/signin" exact component={SignIn} />
            <AuthRoutes path="/dashboard" exact component={Dashboard} />
        </Switch>
    )
}

export default withRouter(routes);