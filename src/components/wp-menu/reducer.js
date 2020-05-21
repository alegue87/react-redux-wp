import { FETCH_MENU, FETCH_MENU_ERROR } from './actions';

export default function (state = { name: "", items: [] }, action) {
  switch (action.type) {
    case FETCH_MENU:
    case FETCH_MENU_ERROR:
      return action.payload;
    default: return state;
  }
}