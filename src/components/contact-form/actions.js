import WPCF7_API from '../../api/wordpress/wpcf7'

export const INIT_WPCF7 = 'INIT_WPCF7'
export const SENDING_FEEDBACK = 'SENDING_FEEDBACK'
export const FEEDBACK_SENT = 'FEEDBACK_SENT'
export const FEEDBACK_ERROR = 'FEEDBACK_ERROR'

export function createFeedback(params = { id: 0, data: {} }) {
  return (dispatch, getState, bag) => {
    dispatch({
      type: SENDING_FEEDBACK
    })

    WPCF7_API.createFeedback(params)
      .then(response => {
        dispatch({
          type: FEEDBACK_SENT,
          payload: { response }
        })
      })
      .catch(error => {
        dispatch({
          type: FEEDBACK_ERROR,
          payload: { response: error.response }
        })
      })
  }
}