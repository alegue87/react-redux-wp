import WpApi from '../../api/wordpress/index'

export const INIT_COMMENTS = 'INIT_COMMENTS';
export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';

export function fetchComments(postId) {
  return (dispatch, getState, bag) => {
    dispatch({
      type: FETCHING_COMMENTS,
      payload: ''
    });
    WpApi.fetchComments(postId)
      .then((response) => {
        dispatch({
          type: FETCH_COMMENTS,
          payload: { list: response.data }
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_COMMENTS_ERROR,
          payload: {data: error.response}
        })
      })
  }
}