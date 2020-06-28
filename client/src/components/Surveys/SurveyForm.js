import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import formFields from './formFields';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';


class SurveyForm extends Component {

    renderFields() {
        return _.map(formFields, field => {
            return (
                <Field
                component ={SurveyField}
                type="text"
                label={field.label}
                name={field.name}
                key={field.name} 
                />
            )
        })
    }

    render() {
        return(
            <div style={{maxHeight:'336px'}}>
                <div className="white-text" style={{ fontSize:'30px', marginBottom:'40px' }}>New Survey</div>
                <form onSubmit={this.props.handleSubmit( this.props.onSurveySubmit )} >
                    {this.renderFields()}
                    <Link to="/surveys" className="blue-grey darken-1 btn-flat left white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="green btn-flat right white-text" >
                        Next
                        <i className="material-icons right">arrow_forward</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    _.each(formFields, ({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });

    errors.recipients = validateEmails(values.recipients || '');

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);