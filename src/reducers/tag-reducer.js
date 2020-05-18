import { FETCH_TAG_INFO, TAG, INIT_TAG } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_TAG:
      return {
        id: 0,          // taxId
        count: 0,       // number of posts
        description: '',
        name: '',
        slug: '',
        taxonomy: '',
        meta: [],
        _links: {}
      }
    case FETCH_TAG_INFO:
    case TAG:  
      return action.payload 
    default:
      return state;
  }
}