import React, { Component } from 'react';
import M from  'materialize-css/dist/js/materialize.min.js';


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  });

class InstructionsModal extends Component {

    renderButton() {
        switch(this.props.size) {
            case 'small':
                return(
                <div>
                    <a className=" btn-flat modal-trigger" href="#instructions">
                       <i className="large material-icons green-text accent-4  center">info_outline</i>
                    </a>
                </div>
                );
            case 'big':
                return(
                <div>
                    <a className="waves-effect waves-light btn-large black modal-trigger" href="#instructions">
                        Get Started <i className="tiny material-icons right ">arrow_forward</i>
                    </a>
                </div>
            );
            default: return;
        }
    }

    renderModal() {
        return (
        <div id={"instructions" || "modalSurvey"} className="modal black white-text">
            <div className="modal-content center">
                <h4>Usage steps:</h4>
                <div className="divider" />
                <p>1. Login with a Google account</p>
                <p>2. "Purchase" credits using Stripe test card details:<br />
                Dummy email address<br/>
                Card number 4242424242424242<br/>
                MM/YY - Future date (07/21)<br/>
                CVC - Any</p>
                <p>3. Create a new survey which contains a single Yes/No question
                and send it over your own mail.
                </p>
                <p>4. Reply the survey at your own mail and check the updated dashboard.</p>
            </div>
            <div className="center  deep-purple center">
                <a href="#!" className="modal-close waves-effect waves-black white-text btn-flat">Continue</a>
            </div>
        </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderButton()}
                {this.renderModal()}
            </div>
        )
    }
}

export default InstructionsModal;




