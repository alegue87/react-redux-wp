import * as action from '../actions'
import {BLOG, BLOG_PAGE, HOME, SINGLE, TAG, CATEGORY} from '../pages';

export const routesMap = {
  [HOME]: { path: '/', thunk: action.fetchPosts() },
  [BLOG]: { path: '/blog', thunk: action.fetchPosts() },
  [BLOG_PAGE]: { path: '/blog/:pageNum', thunk: action.fetchPosts() },
    // Nota: utilizzando /page/:pageNum non va /page/1
  [SINGLE]: {path: '/:slug', thunk: action.fetchPost()},
  [TAG]: {path: '/tag/:id/', thunk: action.fetchPostsFromTax('tags')},
  [CATEGORY]: {path: '/category/:name', thunk: action.getTaxIdFromSlug('categories')}
}