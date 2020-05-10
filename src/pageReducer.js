
import {BLOG, BLOG_PAGE, HOME} from './pages';
import {NOT_FOUND} from 'redux-first-router';

export default (state = [], action = {}) => {
  switch(action.type) {
    case HOME:
    case BLOG:
    case BLOG_PAGE:
      return 'Blog';      // Component
    case NOT_FOUND:
      return 'NotFound';  // Component
    default:
      return state;       // necessario per lo stato iniziale
                          //  state==undefined
  }
}
  