// Manging React components and Routes
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect } from 'react-redux'; // Used to connect Redux's Action Creators
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact /* JSX Shortcut for exact={true} */ path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

// react-redux connect func assigning the actions to component's props
export default connect(null/*MapStateToProps Arg*/, actions/*Actions to be connected*/)(App);