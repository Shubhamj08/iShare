import React from 'react';
import Form from './common/form';
import { Redirect } from 'react-router-dom';
import { register } from '../services/userService';
import { getCurrentUser } from '../services/authService';
import "../css/auth.css";
const Joi = require('joi-browser');


class Signup extends Form {

    state = {
        data : {
            username: "", email:"", password: "", confirm_password: ""
        },
        errors: {}
    };

    schema = {
        username: Joi.string().alphanum().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password"),
        confirm_password: Joi.string().min(8).required().label("Passwords")
    };

    doSubmit = async (user) => {
        try {
            await register(user);
            this.props.history.push('/auth/login');
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {
        if(getCurrentUser()) return <Redirect to='/'/>
        return ( 
            <div className="container mb-5">
                <form
                    className="form-group w-50 rounded border p-5 mx-auto"
                    style={{boxShadow: '4px 4px 16px -8px #888888'}}
                    onSubmit={this.handleSubmit}
                >
                    <h4 className="text-center">Signup</h4>
                    {this.renderInput("username", "Username", "text")}
                    {this.renderInput("email", "Email", "email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("confirm_password", "Confirm Password", "password")}
                    {this.renderButton("Signup")}
                </form>
            </div>
         );
    }
}
 
export default Signup;