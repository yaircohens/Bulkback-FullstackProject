import React from 'react';

export default ({ input, label, meta: { error, touched } }) => { //ES6 Destructuring of props.input
    return (
        <div>
            <label>{label}</label>
            <input className="white-text" {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom:'20px' }}>{touched && error}</div>
            {/*
            input prop has callback functions attached by ReduxForm
            {...input} is a JSX shortcut for assigning these callback functions
            to the same name event handlers <input> has -
            onChange={input.onChange} onBlur={input.onBlur}
            */}
        </div>
    );
}

