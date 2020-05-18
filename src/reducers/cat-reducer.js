import { FETCH_CAT_INFO, CATEGORY, INIT_CAT } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CAT_INFO:
    case CATEGORY:
      return action.payload;
    case INIT_CAT:
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
    default:
      return state;
  }
}