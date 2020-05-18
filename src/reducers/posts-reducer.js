

import {
  INIT_POSTS, FETCHING_POSTS,
  FETCH_POSTS, FETCH_POST, SEARCH_POSTS, 
  CATEGORY_POSTS,  } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
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
      let posts = Object.assign({}, state) // copy
      posts.state = FETCHING_POSTS         // and update state
      return posts
    case FETCH_POSTS:
    case FETCH_POST:
    case SEARCH_POSTS:
    case CATEGORY_POSTS:
      return action.payload;
    default: return state;
  }
}
