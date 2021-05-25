import React from 'react';
import Form from './common/form';
import { apiEndPoint } from '../config.json';
import http from '../services/httpService';
import { toast } from 'react-toastify';
const Joi = require("joi-browser");

class PostIdea extends Form {
    state = {
        data: {
            title: "", description: ""
        },
        errors: {}
    }

    schema = {
        id: Joi.string(),
        title: Joi.string().max(50).required(),
        description: Joi.string().min(20).required()
    }

    componentDidMount() {
        if (!this.props.match)
            return;
        
        const id = this.props.match.params._id
        const idea = this.getIdeaToEdit(id)
        if (!idea)
            return this.props.history.replace("/not-found");
        
        const data = {
            id: idea._id,
            title: idea.title,
            description: idea.description
        }
        this.setState({ data });
    }

    getIdeaToEdit = (id) => {
        const { ideas } = this.props;
        const idea = ideas.find(idea => { return idea._id === id });
        return idea;
    }

    doSubmit = async () => {
        const { data } = this.state;
        if (!this.props.user) {
            toast.error("You have to login first");
        }
        else {
            try {
                await http.post(`${apiEndPoint}/ideas`, data);
                window.location = '/';
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    console.log(ex);
                }
            }
        }
    }

    render() {
        return (
            <div className="container mt-5">
                {this.props.match && this.getIdeaToEdit()}
                {!this.props.user && <h4 className="display-4 text-center">
                    You need to login in order to post!
                </h4>}
                {this.props.user && <h4 className="display-4 text-center">
                    Have an Idea?<br/>Post it here!
                </h4>}
                <form
                    className="form-group w-75 rounded border p-5 mt-3 mx-auto"
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