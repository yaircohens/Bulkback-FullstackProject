import React, { Component } from 'react';
import { connect } from 'react-redux';


class FullPageLoader extends Component {
    state = {

    }

    render() {
        const loading = this.props;
        if(!loading) return null

        return (
            <div
            style={{
                position:'fixed',
                top:'0',
                left:'0',
                width:'100%',
                height:'100%',
                backgroundColor:'black',
                opacity:'0.9'
            }}
            >
                <div
                style={{
                    left:'50%',
                    top:'30%',
                    zIndex:'1000',
                    position:'absolute'
                }}
                >
                    <img alt="loader" src="/assets/loader.svg" />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ loading }) {
    return { loading };
}

export default connect(mapStateToProps)(FullPageLoader);