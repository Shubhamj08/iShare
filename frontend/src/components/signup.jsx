import React from 'react';
import Form from './common/form';
import axios from 'axios'
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
        const req = {
            username: user.username,
            email: user.email,
            password: user.password
        }
        const response = await axios.post('http://localhost:3000/api/users', req)
            .catch((error) => {
                console.log(error);
            });
        console.log(response);
    }

    render() { 
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