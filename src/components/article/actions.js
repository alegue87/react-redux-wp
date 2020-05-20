
import WpApi from '../../api/wordpress/index'

export const INIT_POST = 'INIT_POST'
export const FETCHING_POST = 'FETCHING_POST'
export const FETCH_POST = 'FETCH_POST'
export const FETCH_ERROR = 'FETCH_ERROR'

export function fetchPost() {
  return function (dispatch, getState, bag) {
    dispatch({
      type: FETCHING_POST
    })
    const slug = getState().location.payload.slug

    WpApi.fetchPostFromSlug(slug)
      .then((response) => {
        dispatch({
          type: FETCH_POST,
          payload: {
            data: response.data,
            state: FETCH_POST
          }
        });
      })
      .catch((error) => {
        console.log(error.response)
        dispatch({ type: FETCH_ERROR, payload: error.response })
      })
  }
}