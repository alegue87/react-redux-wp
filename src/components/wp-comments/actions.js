import WpApi from '../../api/wordpress/index'

export const INIT_COMMENTS = 'INIT_COMMENTS';
export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';

export const INIT_COMMENT = 'INIT_COMMENT'
export const REPLY_TO = 'REPLY_TO'
export const CREATING_COMMENT = 'CREATING_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR'

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
          payload: { data: error.response }
        })
      })
  }
}

export function createComment(params = { post: 0, parent: 0, author_name: '', author_email: '', content: '' }) {
  return function (dispatch, getState, bag) {
    dispatch({
      type: CREATING_COMMENT,
      payload:{
        comment:{
          state: CREATING_COMMENT
        }
      }
    })
    WpApi.createComment(params)
      .then(response => {
        dispatch({
          type: CREATE_COMMENT,
          payload: {
            comment: {
              state: CREATE_COMMENT,
              response: response
            }
          }
        })
      })
      .catch(error => {
        dispatch({
          type: CREATE_COMMENT_ERROR,
          payload: {
            comment: {
              state: CREATE_COMMENT_ERROR,
              response: error.response
            }
          }
        })
      })
  }
}

