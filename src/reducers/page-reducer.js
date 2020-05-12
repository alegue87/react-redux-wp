
import * as pages from '../pages'

export default (state = [], action = {}) => {
  return pages[action.type] || state;
}
  