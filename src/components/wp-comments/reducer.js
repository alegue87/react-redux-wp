import {
  INIT_COMMENTS, FETCHING_COMMENTS,
  FETCH_COMMENTS, FETCH_COMMENTS_ERROR,
  INIT_REPLY, REPLY_TO
} from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_COMMENTS:
    case FETCHING_COMMENTS:
      return { state: action.type }
    case FETCH_COMMENTS:
      return Object.assign({},
        action.payload, { state: action.type }, { reply: { state: INIT_REPLY } })
    case FETCH_COMMENTS_ERROR:
      return Object.assign({}, action.payload)
    case REPLY_TO:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}