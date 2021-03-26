import React, { Component } from 'react';
import Input from './common/input';
const Joi = require('joi-browser');

class Login extends Component {

    state = {
        account : {
            username: "", password: ""
        },
        errors: {

        }
    };

    schema = Joi.object({
        username: Joi.string().email().required().label("Username"),
        password: Joi.string().min(8).required().label("Password")
    });

    validate = () => {
        const result = this.schema.validate(this.state.account, {abortEarly: false})
        if (result.error === null) return null;
        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = Joi.object({ [name]: this.schema[name] });
        const { error } = schema.validate(obj);
        return error ? error.details[0].message.toString(): null;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {}})
    }

    handleChange = (e) => {
        const account = { ...this.state.account };
        account[e.currentTarget.name] = e.currentTarget.value;
        const errors = { ...this.state.errors };
        if (errors) errors[e.currentTarget.name] = this.validateProperty(e.currentTarget);
        else delete errors[e.currentTarget.name];
        this.setState({ account, errors });
    }

    render() { 
        return ( 
            <div className="container">
                <h1 className="display-1 mb-5 text-center">Login</h1>
                <form
                    className="w-50 rounded border p-5 m-auto"
                    onSubmit={this.handleSubmit}
                >
                    <Input
                        label="username"
                        name="username"
                        value={this.state.account.username}
                        onChange={this.handleChange}
                        type="email"
                        error={this.state.errors.username}
                    />
                    <Input
                        label="password"
                        name="password"
                        value={this.state.account.password}
                        onChange={this.handleChange}
                        type="password"
                        error={this.state.errors.password}
                    />
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
            </div>
         );
    }
}
 
export default Login;