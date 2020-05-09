import * as action from '../actions'
import {HOME, USER, BLOG, BLOG_PAGE} from '../pages';

export const routesMap = {
  [HOME]: '/',
  [USER]: '/user/:id',
  [BLOG]: { path: '/blog', thunk: action.fetchPosts() },
  [BLOG_PAGE]: { path: '/post/:postId', thunk: action.fetchPost() }

}