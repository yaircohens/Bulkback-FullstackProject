import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './Surveys/SurveyNew';

class App extends Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
        return (
            <div >
                <BrowserRouter>
                    <div className="blue-grey darken-4">
                        <Header />
                        <div  className="container">
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/surveys" component={Dashboard} loading={true} />
                            <Route path="/surveys/new" component={SurveyNew} />
                        </div>
                        <Footer />
                    </div>

                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);