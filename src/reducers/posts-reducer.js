import { FETCH_POSTS, FETCH_POST, SEARCH_POSTS, CATEGORY_POSTS, RESET_POSTS} from '../actions';

export default (state = {page:0, list:[], totalPages:1, total:0}, action) => {

  switch (action.type) {
    case FETCH_POSTS:   
    case FETCH_POST:
    case SEARCH_POSTS:
    case CATEGORY_POSTS:
      return action.payload;
    case RESET_POSTS:
      return { page:0, list:[], totalPages:1, total:0 }

    default: return state;
  }
}
