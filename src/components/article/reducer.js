import { INIT_POST, FETCH_POST, FETCHING_POST, FETCH_POST_ERROR } from './actions'

export default (state = {}, action) => {

  switch (action.type) {
    case INIT_POST: 
    case FETCHING_POST:
      return { state: action.type }
    case FETCH_POST:
    case FETCH_POST_ERROR:    
      return Object.assign(action.payload, { state: action.type })
    default:
      return state
  }
}
