import {ROUTER} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case ROUTER:
            console.log('COUNTER', 'Reducer router')
            return action.payload;
    }
    return state;
}