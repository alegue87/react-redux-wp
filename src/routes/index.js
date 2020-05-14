import * as action from '../actions'
import {BLOG, BLOG_PAGE, HOME, SINGLE, TAG, CATEGORY} from '../actions';

export const routesMap = {
  [HOME]: { path: '/'},
  //[BLOG]: { path: '/blog', thunk: action.fetchPosts() },
  //[BLOG_PAGE]: { path: '/page/:pageNum', thunk: action.fetchPosts() },
  [SINGLE]: {path: '/:slug', thunk: action.fetchPost()},
  [TAG]: {path: '/tag/:slug/', thunk: action.getTaxIdFromSlug('tags')},
  [CATEGORY]: {path: '/category/:slug', thunk: action.getTaxIdFromSlug('categories')},
}