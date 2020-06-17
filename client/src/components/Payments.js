import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
             name="BulkBack"
             description="5$ for bulking 5 email surveys"
             amount={500}
             token={ token => this.props.handleToken(token) }
             stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="waves-effect waves-light btn-small white-text text-lighten-4">Add Credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);