import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Footer = ({ auth }) => {
    return (
        <footer className="page-footer black" style={{minHeight:'260px'}} >
            <div className="container">
                <div className="row">
                    <div className="col l6 s12" style={{marginTop:'50px'}} >
                        <div className="row" style={{display:'flex'}}>
                        <Link
                            to={ auth ? '/surveys' : '/'}
                            className="left brand-logo"
                            >
                        <img alt="logo" src="/assets/logo.svg" style={{width:'40px', height:'40px'}} />
                        </Link>
                        <p> A Fullstack  <a href='#concept' style={{color:'#8060ed'}} >concept</a> project by Yair</p>
                        </div>
                        <p>Built with NodeJS, Express, MongoDB, ReactJS, Redux, OAuth & Stripe</p>
                    </div>
                    <div className="col l4 offset-l2 s12" style={ window.innerWidth < 1024 ? {Left:'100%', marginBottom:'10px'} : {marginTop:'50px', Right:'100%'}} >
                        <h6>Also visit me on:</h6>
                        <div>
                            <a className="grey-text text-lighten-3"
                                href="https://linkedin.in/yair-cohen-s/"
                                style={
                                window.innerWidth < 1024 ?
                                {marginLeft:'0px', marginRight:'25px'} :
                                {marginLeft:'25px', marginRight:'15px'}
                                } >
                                    <img
                                    alt="linkedin-icon"
                                    src="/assets/icon-linkedin.svg"
                                    style={{width:'25px', height:'25px'}}
                                    />

                            </a>
                            <a className="grey-text text-lighten-3"
                                href="https://github.com/yaircohens/"
                                style={ window.innerWidth < 1024 ?
                                {} :
                                {marginLeft:'15px'}
                                }
                            >
                                <img
                                alt="github-icon"
                                src="/assets/icon-github.svg"
                                style={{width:'25px', height:'25px'}
                                }
                                />
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </footer>

    )
}

function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Footer);