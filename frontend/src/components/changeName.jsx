import React from 'react';
import { toast } from 'react-toastify';
import { getCurrentUser, setCurrentUser } from '../services/authService';
import { changeUsername } from '../services/userService';
import Form from './common/form';
const Joi = require('joi-browser');

class ChangeName extends Form {
    state = {
        data : {
            new_username: "",
        },
        errors: {}
    };

    schema = {
        new_username: Joi.string().required().min(4).max(20).label("Username")
    };

    doSubmit = async (data) => {
        try {
            let user = getCurrentUser();
            user = await changeUsername(user.email, data.new_username);
            toast.success("Username Updated. Click refresh to show changes..");
            setCurrentUser(user);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.new_username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {
        if (!getCurrentUser()) return <h1>You Need To Login!!</h1>;
        return ( 
            <div className="container mt-5">
                <form
                    className="form-group w-50 rounded border p-5 mx-auto"
                    style={{boxShadow: '2px 2px 8px -4px #888888'}}
                    onSubmit={this.handleSubmit}
                >
                    <h4 className="text-center">Update Username</h4>
                    {this.renderInput("new_username", "New Username", "text")}
                    {this.renderButton("Submit")}
                </form>
            </div>
         );
    }
}
 
export default ChangeName;