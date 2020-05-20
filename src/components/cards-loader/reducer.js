import { 
  INIT_POSTS, FETCHING_POSTS, FETCH_POSTS, FETCH_POSTS_ERROR,
  INIT_TAG, FETCH_TAG_INFO, FETCH_TAG_INFO_ERROR,
  INIT_CAT, FETCH_CAT_INFO, FETCH_CAT_INFO_ERROR } from './actions'

export const posts = (state={}, action) => {
  switch(action.type){
    case INIT_POSTS: 
      return {
        page: 0,
        list: [],
        totalPages: 1,
        total: 0,
        state: INIT_POSTS,
        tax:''
      }
    case FETCHING_POSTS:
      let copy =  Object.assign({}, state) // copy previous 'posts'
      copy.state = FETCHING_POSTS
      return copy
    case FETCH_POSTS:
    case FETCH_POSTS_ERROR:
      return Object.assign(action.payload, {state: action.type})
    default:
      return state
  }
}

export const cat = (state={}, action) => {
  switch(action.type){
    case INIT_CAT:
      return { state: action.type }
    case FETCH_CAT_INFO:
    case FETCH_CAT_INFO_ERROR:
      return Object.assign(action.payload, {state: action.type})
    default:
      return state
  }
}

export const tag = (state={}, action) => {
  switch(action.type){
    case INIT_TAG:
      return { state: action.type }
    case FETCH_TAG_INFO:
    case FETCH_TAG_INFO_ERROR:
      return Object.assign(action.payload, {state: action.type})
    default:
      return state
  }
}