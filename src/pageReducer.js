
import {pages} from './pages';

export default (state = 'HOME', action = {}) => pages[action.type] || state
