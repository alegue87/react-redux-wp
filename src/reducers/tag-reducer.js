import { FETCH_TAG_INFO, TAG } from '../actions';

export default (state = {taxId:0, slug:'', name:''}, action) => {
  switch (action.type) {
    case FETCH_TAG_INFO:
      return {
        taxId: action.payload[0].id,
        slug: action.payload[0].slug,
        name: action.payload[0].name
      }
    case TAG: // link / rotta
      return action.payload;
    default:
      return state;
  }
}