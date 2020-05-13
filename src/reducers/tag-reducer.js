import { FETCH_TAG_INFO, TAG } from '../actions';

export default (state = {taxId:0, slug:'', name:''}, action) => {
  switch (action.type) {
    case FETCH_TAG_INFO:
    case TAG:
      return action.payload;
    default:
      return state;
  }
}