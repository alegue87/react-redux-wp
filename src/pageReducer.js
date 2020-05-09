
import {pages, BLOG} from './pages';

export default (state = BLOG, action = {}) => 
  pages[action.type] || state

  