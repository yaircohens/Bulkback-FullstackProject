import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {

    componentDidMount() {
        this.props.fetchSurveys();
    }


    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="col s12 m6 l4">
                    <div className="card grey darken-4" key={survey._id}>
                        <div className="card-image waves-effect waves-block waves-light">
                            <img alt="survey-illustration" className="activator" src="assets/survey-illus.svg" />
                        </div>
                        <div className="card-content">
                            <span className="card-title activator white-text text-darken-4">{survey.title}<i className="material-icons right">more_vert</i></span>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{survey.title}<i className="material-icons right">close</i></span>
                            <h6>{survey.subject}</h6>
                            <p>{new Date(survey.dateSent).toLocaleString().split('GMT')}<i className="material-icons right">access_time</i></p>
                            <br />
                            <h6>{survey.body}</h6>
                            <br />
                            <div style={{marginTop:'100px'}} >
                            <p>Replied <span className="green-text" >Yes</span>: {survey.yes}<i className="material-icons tiny right green-text">check_circle</i></p>
                            <p>Replied <span className="red-text" >No</span>: {survey.no}<i className="material-icons tiny right red-text">cancel</i></p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render () {
        return(
        <div className="row">
            {this.renderSurveys()}
        </div>
        );
    }
}

function mapStateToProps(state) {
    return { surveys: state.surveys }
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)