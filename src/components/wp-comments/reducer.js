import {
  INIT_COMMENTS, FETCHING_COMMENTS,
  FETCH_COMMENTS, FETCH_COMMENTS_ERROR
} from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_COMMENTS:
    case FETCHING_COMMENTS:
      return { state: action.type }
    case FETCH_COMMENTS:
    case FETCH_COMMENTS_ERROR:
      return Object.assign(action.payload, {state: action.type})
    default:
      return state
  }
}