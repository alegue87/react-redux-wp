import {
  INIT_WPCF7,
  SENDING_FEEDBACK, FEEDBACK_SENT,
  FEEDBACK_ERROR
} from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_WPCF7:
      return { state: INIT_WPCF7 }
    case SENDING_FEEDBACK:
      return { state: SENDING_FEEDBACK }
    case FEEDBACK_SENT:
    case FEEDBACK_ERROR:
      return Object.assign({}, { state: action.type }, action.payload)
    default:
      return state
  }
}