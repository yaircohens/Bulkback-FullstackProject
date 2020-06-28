import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, ({ name, label }) => {

        const numOfRecipients = formValues['recipients'].split(',').length;

        return (
            <div className="white-text" key={name} style={{margin:'25px'}} >
                <h6 className='grey-text'>{label === 'Recipients' ? 'Number of Recipients' : label }</h6>
                <div>
                    { name === 'recipients' ? numOfRecipients : formValues[name] }
                </div>
            </div>
        );
    })

    return (
        <div className='grey darken-4' style={ window.innerWidth > 600 ?
            {height:'500px', width:'500px', paddingTop:'40px', borderRadius:'8%', margin:'0 auto'} :
            {height:'500px', width:'320px', paddingTop:'20px', borderRadius:'8%', margin:'0 auto'} }
        >
            <div style={{textAlign:'center'}}>
                <h5 className="white-text">Confrim your survey to continue</h5>
                <div >
                {reviewFields}
                </div>
            </div>
            <div style={ window.innerWidth > 600 ?
                    {marginLeft:'70px', marginRight:'70px', marginTop:'40px'} :
                    {marginLeft:'30px', marginRight:'30px', marginTop:'40px'} }
                >
                <button
                    className="blue-grey darken-1 btn-flat white-text left"
                    onClick={onCancel}
                >
                Edit
                <i className="material-icons left">create</i>
                </button>
                <button
                    onClick={() => submitSurvey(formValues, history)}
                    className="green btn-flat white-text right"

                >
                    Send Survey
                    <i className="material-icons right">email</i>
                </button>
            </div>

        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));