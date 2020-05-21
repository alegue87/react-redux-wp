import { INIT_POST } from '../components/article/actions'
import { INIT_POSTS, INIT_TAG, INIT_CAT } from '../components/cards-loader/actions'

export const HOME = 'HOME';
export const SINGLE = 'SINGLE';
export const TAG = 'TAG';
export const CATEGORY = 'CATEGORY';

export const routesMap = {
  [HOME]: { path: '/', thunk: init()},
  [SINGLE]: {path: '/:slug', thunk: init()},
  [TAG]: {path: '/tag/:slug/', thunk: init()},
  [CATEGORY]: {path: '/category/:slug', thunk: init()},
}

export function init(dispatch) {
  return (dispatch, getState, bag) => {
    dispatch({
      type: INIT_POST
    });
    dispatch({
      type: INIT_POSTS
    });
    dispatch({
      type: INIT_CAT
    });
    dispatch({
      type: INIT_TAG
    });
  }
}