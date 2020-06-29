import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

import M from  'materialize-css/dist/js/materialize.min.js';

class Header extends Component {

    componentDidMount() {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
      }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return  (
                            <div
                                style={ window.innerWidth < 1024 ?
                                    {display:'flex', marginTop:'25px'} :
                                    {display:'flex', marginTop:'5px'} }
                            >
                                <li>
                                    <a style={{ color:'white' }} href="/auth/google">Sign in with Google
                                    <img alt="logo" src="/assets/google-logo.svg"
                                        style={ window.innerWidth < 1024 ?
                                            {float:'right', width:'30px', height:'30px', marginTop:'10px', marginLeft:'5px'} :
                                            {float:'right', width:'25px', height:'25px', marginTop:'20px', marginLeft:'5px'} }
                                    />
                                    </a>
                                </li>
                            </div>
                        );
            default:
                    if (window.innerWidth >= 1024) {
                        return [
                            <li key="2"><Payments shape='square' /></li>,
                            <li key="3" style={{ margin: '0 18px'}} >Credits: {this.props.auth.credits}</li>,
                            <li key="1"><a style={{color:'white'}} href="/api/logout">{ this.props.auth.name }, Logout</a></li>
                            ];
                    } else {
                        return [
                            <li key="2"><a style={{color:'white', textAlign:'left'}} href="/api/logout">{ this.props.auth.name }, Logout</a></li>,
                            <li key="3"><Payments shape='square' /></li>,
                            <li key="1" style={{ margin: '0 18px'}} >Credits: {this.props.auth.credits}</li>
                          ];
                    }

        }
    }


    render () {
        return(
             window.innerWidth > 1024 ? (
                <React.Fragment>
                    <nav className="black"style={{height: '100px',  paddingTop:'5px'}}>
                        <div className="container" style={{paddingTop:'10px'}}>
                            <Link
                            to={ this.props.auth ? '/surveys' : '/'}
                            className="left brand-logo"
                            >
                                <img alt="logo" src="/assets/logo.svg" style={{width:'40px', height:'40px', marginTop:'10px', fill:'white'}} />
                                BulkBack</Link>
                            <ul className="right" >
                                { this.renderContent() }
                            </ul>
                        </div>
                    </nav>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div >
                        <nav className="black" style={{height: '70px', paddingTop:'10px'}}>
                            <div className="container">
                                <Link
                                to={ this.props.auth ? '/surveys' : '/'}
                                className="center brand-logo"
                                >
                                <img alt="logo" src="/assets/logo.svg" style={{width:'30px', height:'30px', }} />

                                BulkBack
                                </Link>
                                <ul className="right" >

                                </ul>
                            </div>
                            <a href="#" data-target="slide-out" className="sidenav-trigger show-on-medium left">
                                <i className="material-icons text-white">menu</i>
                            </a>
                        </nav>
                        <ul id="slide-out" className="sidenav white-text grey darken-4">
                            <li key="1">
                                <div className="user-view">
                                        <div style={{display:'flex', marginLeft:'30px'}} >
                                            <img src="assets/logo.svg" />
                                            <h4 style={{paddingTop:'10px'}} >BulkBack</h4>
                                            </div>
                                        <div className="divider" style={{marginBottom:'15px'}} />
                                </div>
                            </li >
                            <ul className="user view white-text" key="2">

                                    { this.renderContent() }
                            </ul>
                        </ul>
                    </div>
                </React.Fragment>
            )





        );
    }
}


function mapStateToProps(state) {
    return { auth: state.auth, credits: state.credits }; //With ES16 could be reduced to
    // mapStateToProps({ auth }){
    // return { auth };
    // }
}

export default connect(mapStateToProps)(Header);