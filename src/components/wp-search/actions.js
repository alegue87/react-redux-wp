
import WpApi from '../../api/wordpress/index'
export const INIT_SEARCH = 'INIT_SEARCH'
export const SEARCH_POSTS = 'SEARCH_POSTS';
export const SEARCH_POSTS_LOADING = 'SEARCH_POSTS_LOADING';
export const SEARCH_POSTS_ERROR = 'SEARCH_POSTS_ERROR'

export function searchSite(term, post_type = 'posts') {
  return function (dispatch) {
    dispatch({
      type: SEARCH_POSTS_LOADING,
      payload: ''
    })
    WpApi.searchSite(term, post_type)
      .then(response => {
        dispatch({
          type: SEARCH_POSTS,
          payload: {
            list: response.data,
            state: SEARCH_POSTS
          }
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_POSTS_ERROR,
          payload: {
            data: error.response,
            state: SEARCH_POSTS_ERROR
          }
        });
      })
  }
}