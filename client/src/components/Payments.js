import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from  '../actions';

class Payments extends Component {

    renderContent() {
        switch(this.props.shape) {
            case 'square':
                return (
                    <button href="" className="btn-small white-text text-lighten-4  deep-purple darken-1 darken-1">
                        Add Credits
                    </button>
                    );
            case 'round':
                return (
                    <div className="btn-floating btn-large pulse deep-purple">
                        <i className="large material-icons">add</i>
                    </div>
                    );
            default:
                return (
                <div className="btn-small white-text text-lighten-4  deep-purple darken-1 darken-1">
                    Add Credits
                </div>
                );
        }
    };

    render() {
        return (
            <StripeCheckout
             name="BulkBack"
             description="5$ for bulking 5 email surveys"
             amount={500}
             token={ token => this.props.handleToken(token) }
             stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            {this.renderContent()}
            </StripeCheckout>
        );
    }
}


export default connect(null, actions)(Payments);