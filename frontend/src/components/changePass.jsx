import React from 'react';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../services/authService';
import { changePassword } from '../services/userService';
import Form from './common/form';
const Joi = require('joi-browser');

class ChangePass extends Form {
    state = {
        data : {
            curr_password:"", new_password: "", confirm_password: ""
        },
        errors: {}
    };

    schema = {
        curr_password: Joi.string().min(8).required().label("Current Password"),
        new_password: Joi.string().min(8).required().label("New Password"),
        confirm_password: Joi.string().min(8).required().label("Confirm New Password")
    };

    doSubmit = async (data) => {
        try {
            let user = getCurrentUser();
            user = await changePassword(user.email, data.curr_password, data.new_password);
            toast.success("Password Changed");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.curr_password = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {
        if (!getCurrentUser()) return <h1>You Need To Login!!</h1>;
        return ( 
            <div className="container mb-5">
                <form
                    className="form-group w-50 rounded border p-5 mx-auto"
                    style={{boxShadow: '4px 4px 16px -8px #888888'}}
                    onSubmit={this.handleSubmit}
                >
                    <h4 className="text-center">Signup</h4>
                    {this.renderInput("curr_password", "Current Password", "password")}
                    {this.renderInput("new_password", "New Password", "password")}
                    {this.renderInput("confirm_password", "Confirm New Password", "password")}
                    {this.renderButton("Submit")}
                </form>
            </div>
         );
    }
}
 
export default ChangePass;