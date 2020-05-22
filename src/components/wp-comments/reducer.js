import {
  INIT_COMMENTS, FETCHING_COMMENTS,
  FETCH_COMMENTS, FETCH_COMMENTS_ERROR,
  INIT_COMMENT, REPLY_TO,
  CREATING_COMMENT, CREATE_COMMENT, CREATE_COMMENT_ERROR
} from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_COMMENTS:
    case FETCHING_COMMENTS:
      return { state: action.type }
    case FETCH_COMMENTS:
      return Object.assign({},
        action.payload, { state: action.type }, { comment: { state: INIT_COMMENT } })
    case FETCH_COMMENTS_ERROR:
      return Object.assign({}, action.payload)
    case INIT_COMMENT:
      return Object.assign({}, state, { comment: { state: INIT_COMMENT }})
    case REPLY_TO:
    case CREATING_COMMENT:
    case CREATE_COMMENT:
    case CREATE_COMMENT_ERROR:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}