import { FETCH_POSTS, FETCH_POST } from './actions'

export default (state=[], action) => { 
  switch(action.type) {
    case FETCH_POST:
      return [action.payload];
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
}