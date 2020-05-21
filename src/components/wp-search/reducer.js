import {
  INIT_SEARCH,
  SEARCH_POSTS,
  SEARCH_POSTS_LOADING,
  SEARCH_POSTS_ERROR
} from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_SEARCH:
    case SEARCH_POSTS_LOADING:
      let copy = Object.assign({}, state)
      copy.state = action.type
      return copy
    case SEARCH_POSTS:
    case SEARCH_POSTS_ERROR:
      return action.payload
    default:
      return state
  }
}