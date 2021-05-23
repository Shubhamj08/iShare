import React from 'react';
import Form from './common/form';
import { login, getCurrentUser } from '../services/authService';
import { Redirect } from 'react-router-dom';
import "../css/auth.css";
const Joi = require('joi-browser');



class Login extends Form {

    state = {
        data : {
            username: "", password: ""
        },
        errors: {}
    };

    schema = {
        username: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password")
    };

    doSubmit = async (user) => {
        try {
            await login(user);
            window.location = '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {
        if(getCurrentUser()) return <Redirect to='/'/>
        return (
            <div className="container">
                <form
                    className="form-group w-50 rounded border p-5 mx-auto"
                    style={{boxShadow: '4px 4px 16px -8px #888888'}}
                    onSubmit={this.handleSubmit}
                >
                    <h4 className="text-center">Login</h4>
                    {this.renderInput("username", "Email", "email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
         );
    }
}
 
export default Login;