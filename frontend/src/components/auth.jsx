import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthSidebar from './authSidebar';
import Login from './login';
import Signup from './signup';

class Auth extends Component {
    render() { 
        return (
        <div className="container mt-5">
            <AuthSidebar />
            <Switch>
                <Route path="/auth/login" component={Login}></Route>
                <Route path="/auth/signup" component={Signup}></Route>
                <Redirect from="/auth" exact to="/auth/login" />
            </Switch>
        </div>
         );
    }
}
 
export default Auth;