import * as action from '../actions'
import {BLOG, BLOG_PAGE, HOME, SINGLE, TAG, CATEGORY} from '../actions';
import {NOT_FOUND} from 'redux-first-router';

export const routesMap = {
  [HOME]: { path: '/', thunk: action.fetchPosts() },
  [BLOG]: { path: '/blog', thunk: action.fetchPosts() },
  [BLOG_PAGE]: { path: '/page/:pageNum', thunk: action.fetchPosts() },
  [SINGLE]: {path: '/:slug', thunk: action.fetchPost()},
  [TAG]: {path: '/tag/:slug/', thunk: action.fetchPostsFromTax('tags')},
  [CATEGORY]: {path: '/category/:slug', thunk: action.fetchPostsFromTax('categories')},
  [NOT_FOUND]: { path: '/blog'}
}