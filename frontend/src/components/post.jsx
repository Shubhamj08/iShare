import React from 'react';
import Form from './common/form';
import { apiEndPoint } from '../config.json';
import http from '../services/httpService';
const Joi = require("joi-browser");

class PostIdea extends Form {
    state = {
        data: {
            title: "", description: ""
        },
        errors: {}
    }

    schema = {
        title: Joi.string().max(20).required(),
        description: Joi.string().min(20).required()
    }

    doSubmit = async () => {
        const { data } = this.state;
        try {
            await http.post(`${apiEndPoint}/ideas`, data);
            window.location = '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                console.log(ex);
            }
        }
    }

    render() { 
        return (
            <div className="container">
                {!this.props.user && <h4 className="display-4 text-center">
                    You need to login in order to post!
                </h4>}
                <form
                    className="form-group w-75 rounded border p-5 mx-auto"
                    style={{boxShadow: '4px 4px 16px -8px #888888'}}
                    onSubmit={this.handleSubmit}
                >
                    <h4 className="text-center">Post Here!!</h4>
                    {this.renderInput("title", "Title", "text")}
                    {this.renderMultilineInput("description", "Description", "text")}
                    {this.renderButton("Submit")}
                </form>
            </div>
         );
    }
}
 
export default PostIdea;