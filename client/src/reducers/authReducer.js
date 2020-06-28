import { FETCH_USER } from '../actions/types';

const initialState = {
    loading: true
}

export default function(state = initialState, action) {

    switch (action.type) {

        case FETCH_USER:
            return  action.payload || false; // If user isn't logged in
            // payload will return an empty string

        default:
            return state;
    }
}