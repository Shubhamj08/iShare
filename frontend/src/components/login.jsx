import React from 'react';
import Form from './common/form';
import axios from 'axios';
const Joi = require('joi-browser');


class Login extends Form {

    state = {
        data : {
            username: "", password: ""
        },
        errors: {}
    };

    schema = {
        username: Joi.string().email().required().label("Username"),
        password: Joi.string().min(8).required().label("Password")
    };

    doSubmit = async (user) => {
        const req = {
            email: user.username,
            password: user.password
        };
        const response = await axios.post('http://localhost:3000/api/auth', req)
            .catch((error) => {
                console.log(error);
            });
        console.log(response);
    }

    render() { 
        return ( 
            <div className="container">
                <form
                    className="form-group w-50 rounded border p-5 mx-auto"
                    style={{boxShadow: '4px 4px 16px -8px #888888'}}
                    onSubmit={this.handleSubmit}
                >
                    <h4 className="text-center">Login</h4>
                    {this.renderInput("username", "Username", "email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
         );
    }
}
 
export default Login;