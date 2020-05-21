import {
  INIT_COMMENTS, FETCHING_COMMENTS,
  FETCH_COMMENTS, FETCH_COMMENTS_ERROR
} from './actions'

export default (state = {}, action) => {
  switch(action.type){
    case INIT_COMMENTS:
    case FETCHING_COMMENTS:
      let copy = Object.assign({}, state)
      copy.state = action.type
      return copy
    case FETCH_COMMENTS:
    case FETCH_COMMENTS_ERROR:
      return Object.assign(action.payload, {state:action.type})
    default:
      return state
  }
}