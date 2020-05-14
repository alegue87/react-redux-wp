import { FETCH_CAT_INFO, CATEGORY } from '../actions';

export default (state = { taxId: 0, slug: '' }, action) => {
  switch (action.type) {
    case FETCH_CAT_INFO:
      return {
        taxId: action.payload[0].id,
        slug: action.payload[0].slug,
      }
    case CATEGORY:
      return action.payload;
    default:
      return state;
  }
}