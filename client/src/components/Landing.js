import React, { Component } from 'react';

import InstructionsModal from './InstructionsModal';

class Landing extends Component {

    renderContent() {
        return (
            <div style={{marginTop:'20px'}} >
                <InstructionsModal size="big" />
            </div>
        );
    }
    render () {
        return (
            <div
                style={ window.innerWidth < 600 ?
                    { textAlign:'center', minHeight:'360px'} :
                    { textAlign:'center', minHeight:'540px'} }
                >

                <div className="deep-purple"
                    style={ window.innerWidth <= 1024 ?
                            window.innerWidth <= 600 ?
                        { height:'330px', width:'330px', borderRadius: '80%', position:'relative', margin:'auto', marginTop:'75px' } :
                        { height:'400px', width:'400px', borderRadius: '80%', position:'relative', margin:'auto', marginTop:'75px' } :
                        { height:'500px', width:'500px', borderRadius: '80%', position:'relative', margin:'auto', marginTop:'75px' } }
                >
                    <h1 className="white-text"
                        style={ window.innerWidth <= 1024 ?
                                window.innerWidth <= 600 ?
                                { paddingTop:'70px' } :
                                { paddingTop:'90px' } :
                                { paddingTop:'120px' } }
                    >BulkBack</h1>
                    <span className="white-text">Easily collect feedback from your users!</span>
                    {this.renderContent()}
                </div>

            </div>
        );
    }
};

export default Landing;

