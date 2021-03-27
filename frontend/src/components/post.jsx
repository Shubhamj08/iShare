import React from 'react';
import Form from './common/form';
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
        description: Joi.string().alphanum().min(20).required()
    }

    doSubmit = () => {
        console.log('posted');
    }

    render() { 
        return (
            <div className="container">
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