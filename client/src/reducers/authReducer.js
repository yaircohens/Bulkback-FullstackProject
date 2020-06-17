import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {

    switch (action.type) {

        case FETCH_USER:
            return action.payload || false; // If user isn't logged in
            // payload will return as an empty string
            // in JavaScript "" equals to false so -
            // return true or false if user is logged in
            // or false || false if not

        default:
            return state;
    }
}