import React, { Component } from 'react';
import Input from './input';
const Joi = require("joi-browser");

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const schema = Joi.object(this.schema);
        const result = schema.validate(this.state.data, { abortEarly: false })
        let errors = {};
        if ('new_password' in this.state.data) {
            const { curr_password, new_password, confirm_password } = this.state.data;
            if (curr_password === new_password) {
                errors["new_password"] = "Current password and New password cannot be same";
            }
            else if (new_password !== confirm_password) {
                errors["confirm_password"] = "Passwords do not match";
            }
        }
        else if ('confirm_password' in this.state.data) {
            const { password, confirm_password } = this.state.data;
            if (password !== confirm_password) {
                errors["confirm_password"] = "Passwords do not match";
            }
        }
        if (result.error === null && Object.keys(errors).length === 0) return null;
        if (result.error === null) return errors;
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
        this.setState({ errors: errors || {} }, () => {
            if (Object.keys(this.state.errors).length === 0) {
                this.doSubmit(this.state.data);
            }
        })
    }

    handleChange = (e) => {
        const data = { ...this.state.data };
        data[e.currentTarget.name] = e.currentTarget.value;
        const errors = { ...this.state.errors };
        if (errors) errors[e.currentTarget.name] = this.validateProperty(e.currentTarget);
        else delete errors[e.currentTarget.name];
        this.setState({ data, errors });
    }

    renderButton(label) {
        return (
        <button type="submit" className="btn btn-dark">
            {label}
        </button>
        );
    }

    renderInput(name, label, type) {
        return (
            <Input
                label={label}
                name={name}
                value={this.state.data[name]}
                onChange={this.handleChange}
                type={type}
                error={this.state.errors[name]}
            />
        );
    }

    renderMultilineInput(name, label, type) {
        return (
            <div>
                <label htmlFor={name}>{ label }</label>
                <textarea
                    placeholder={`${label}... (min 20 characters)`}
                    className="form-control mb-3"
                    name={name}
                    value={this.state.data[name]}
                    onChange={this.handleChange}
                    rows="5"
                />
                {this.state.errors[name] && <small className="mt-5 text-danger">{this.state.errors[name]}</small>}
            </div>
        );
    }
}
 
export default Form;