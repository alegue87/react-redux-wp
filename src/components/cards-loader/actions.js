import WpApi from '../../api/wordpress/index'

export const INIT_POSTS = 'INIT_POSTS';
export const FETCHING_POSTS = 'FETCHING_POSTS';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

export const INIT_TAG = 'INIT_TAG';
export const INIT_CAT = 'INIT_CAT';
export const FETCH_CAT_INFO = 'FETCH_CAT_INFO';
export const FETCH_TAG_INFO = 'FETCH_TAG_INFO';
export const FETCH_TAG_INFO_ERROR = 'FETCH_TAG_INFO_ERROR'
export const FETCH_CAT_INFO_ERROR = 'FETCH_CAT_INFO_ERROR'


export function fetchPosts({
  post_type = 'posts',
  per_page = 1,
  page = 1,
  tax = '',
  context = '_embed',
  appendToPreviousPosts = false,
}) {
  return function (dispatch, getState, bag) {
    const state = getState()
    dispatch({
      type: FETCHING_POSTS
    })

    // cerca di recuperare il tax id
    // dal primo recupero dei posts, dove
    // viene richiesto per la prima volta.
    let taxId = 0,
      action = ''
    switch (tax) {
      case 'tags':
        taxId = state.tag.id
        action = FETCH_TAG_INFO
        break
      case 'categories':
        taxId = state.cat.id
        action = FETCH_CAT_INFO
        break;
      default: ;
    }
    if (taxId) {
      const tax_query = `&${tax}=${taxId}`
      fetchPostsAndDispatch(post_type, context, per_page, page, tax_query, state, dispatch)
    }
    else if (!taxId && (tax === 'categories' || tax === 'tags')) {
      const slug = state.location.payload.slug
      fetchTaxInfo(action, tax, slug, state, fetchPostsAndDispatch, dispatch)
    }
    else {
      const tax_query = ''
      fetchPostsAndDispatch(post_type, context, per_page, page, tax_query, state, dispatch)
    }
  }

  function fetchTaxInfo(action, tax, slug, state, cb, dispatch) {
    WpApi.fetchTaxInfo(tax, slug)
      .then(response => {
        dispatch({
          type: action,
          payload: response.data[0] // TODO: da verificare il significato di questo array
        })

        const taxId = response.data[0].id// nota: uno slug può avere anche più taxId (?) 
        const tax_query = `&${tax}=${taxId}`
        cb(post_type, context, per_page, page, tax_query, state, dispatch)
      })
      .catch(error => {
        dispatch({
          type: (tax === 'tags') ? FETCH_TAG_INFO_ERROR : FETCH_CAT_INFO_ERROR,
          payload: error.response || ''
        })
      })
  }
  function fetchPostsAndDispatch(post_type, context, per_page, page, tax_query = '',
    state, dispatch) {
    WpApi.fetchPosts(post_type, context, per_page, page, tax_query)
      .then(response => {
        let postsList = []
        if (appendToPreviousPosts) {
          let prevList = []
          if (page > 1) {
            prevList = state.posts.list;
          }
          postsList = prevList.concat(response.data)
        }
        else {
          postsList = response.data
        }

        dispatch({
          type: FETCH_POSTS,
          payload: {
            list: postsList,
            totalPages: response.headers['x-wp-totalpages'],
            total: response.headers['x-wp-total'],
            page: page,
            tax: tax,
            state: FETCH_POSTS
          }
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_POSTS_ERROR,
          payload: error.response || ''
        })
      })
  }
}