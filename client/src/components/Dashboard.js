import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import SurveysList from './Surveys/surveysList';
import Payments from './Payments';
import FullPageLoader from './FullPageLoader';
import InstructionsModal from './InstructionsModal';

class Dashboard extends Component {

    renderContent() {
        switch(this.props.auth.loading) {
            case true:
                return <FullPageLoader />;
            default:

                if(this.props.auth) {
                    if (this.props.auth.credits === 0) {
                        return (
                            <div>

                                <div className="fixed-action-btn"
                                    style={ window.innerWidth <= 1024 ?
                                            window.innerWidth <= 600 ?
                                            {bottom: '60%', top:'12%', right:'3%'} :
                                            {bottom: '60%', top:'20%', right:'4%'} :
                                            {bottom: '60%', top:'11.5%', right:'12%'}}
                                >
                            <Payments shape="round" />
                                </div>
                                <SurveysList/>
                            </div> );
                    } else {
                        return (
                            <div>
                                <div className="fixed-action-btn"
                                    style={ window.innerWidth <= 1024 ?
                                            window.innerWidth <= 600 ?
                                            {bottom: '60%', top:'10.5%', right:'3%'} :
                                            {bottom: '60%', top:'20%', right:'4%'} :
                                            {bottom: '60%', top:'11.5%', right:'12%'}}
                                >
                                <Link to="/surveys/new"  className="btn-floating btn-large pulse deep-purple">
                                <i className="large material-icons">add</i>
                                </Link>
                                </div>
                                <SurveysList/>
                            </div> );
                    }
                }
                return

        };
    }

    render() {
        return (
            <div style={{minHeight: '70vh'}}>
                    <div style={{display:'flex'}}>
                        <div style={{marginTop:'20px'}}>
                        <InstructionsModal size='small' />
                        </div>
                        <h3 className="white-text" style={
                            window.innerWidth <= 1024 ?
                            window.innerWidth <= 600 ?
                                {marginLeft:'20px'} :
                                {marginLeft:'160px'} :
                                {marginLeft:'20px'}
                                }>Dashboard</h3>

                    </div>
                    {this.renderContent()}

            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps, actions)(Dashboard);