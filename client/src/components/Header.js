import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Payments from './Payments';


class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>;
            default:
                return [

                    <li key="1"><Payments/></li>,
                    <li key="3" style={{ margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key="2"><a href="/api/logout">{ this.props.auth.name }, Logout</a></li>
                ];
        }
    }

    render () {
        return(
            <nav className="blue-grey darken-1">
                <div>
                    <Link
                    to={ this.props.auth ? '/surveys' : '/'}
                     className="left brand-logo"
                    >
                        BulkBack</Link>
                    <ul className="right">
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}


function mapStateToProps(state) {
    return { auth: state.auth }; //With ES16 could be reduced to
    // mapStateToProps({ auth }){
    // return { auth };
    // }
}

export default connect(mapStateToProps)(Header);