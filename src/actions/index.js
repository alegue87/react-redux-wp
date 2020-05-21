/* eslint-disable no-undef */
import axios from 'axios';


export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
// Pages ( state.location.type )


export function fetchPostsFromTax(tax = 'categories', taxId = 0, post_type = 'posts') {
  return function (dispatch, getState, bag) {
    let slug = ''
    if (bag !== undefined) {
      taxId = bag.action.payload.taxId // da click su link
      slug = bag.action.payload.slug
    }

    if (taxId === undefined || !taxId) {
      const taxIdUrl = `${WP_API_ENDPOINT}/${tax}?slug=${slug}`;
      axios.get(taxIdUrl)
        .then(response => {
          const taxId = response.data[0].id
          fetchPosts(post_type, tax, taxId)  // nota: uno slug può avere anche più
          // taxId  
        })
    }
    else {
      fetchPosts(post_type, tax, taxId);
    }

    function fetchPosts(post_type = 'posts', tax, taxId, offset = 0) {
      const postsUrl = `${WP_API_ENDPOINT}/${post_type}?_embed&${tax}=${taxId}&offset=${offset}&per_page=1`;
      axios.get(postsUrl)
        .then(response => {
          dispatch({
            type: CATEGORY_POSTS,
            payload: {
              list: response.data
            }
          });
        });
    }
  }
}

export function fetchCatsFromSlug(slug, tax = 'categories', pageNum = 1) {
  return function (dispatch, getState, bag) {
    if (bag !== undefined) {
      slug = bag.action.payload.slug
    }
    const url = `${WP_API_ENDPOINT}/${tax}?_embed&slug=${slug}&page=${pageNum}`;
    axios.get(url)
      .then(response => {
        dispatch({
          type: CATEGORY_POSTS,
          payload: {
            list: response.data
          }
        });
      });
  }
}

export function getTaxIdFromSlug(tax, slug) {
  return function (dispatch, getState, bag) {
    if (bag !== undefined) {
      //tax = bag.action.payload.tax;
      slug = bag.action.payload.slug;
    }
    axios.get(`${WP_API_ENDPOINT}/${tax}?slug=${slug}`)
      .then(response => {
        switch (tax) {
          case "tags":
            dispatch({
              type: FETCH_TAG_INFO,
              payload: response.data
            });
            break;
          case "categories":
            dispatch({
              type: FETCH_CAT_INFO,
              payload: response.data
            });
            break;
          default:
            ;
        }

      });
  }
}


export function fetchTaxInfo(tax, postId, tagIds) {
  return function (dispatch) {
    axios.get(`${WP_API_ENDPOINT}/${tax}/?include=${tagIds}`)
      .then(response => {
        dispatch({
          type: FETCH_TAG_INFO,
          payload: {
            list: response.data,
            postId: postId
          }
        });
      });
  }
}



export function fetchComments(postId) {
  return function (dispatch) {
    axios.get(`${WP_API_ENDPOINT}/comments?post=${postId}&orderby=parent&per_page=100`)
      .then(response => {
        dispatch({
          type: FETCH_COMMENTS,
          payload: response.data
        });
      })
  }
}

export function createComment(params = { post: 0, parent: 0, author_name: '', author_email: '', content: '' }) {
  return function (dispatch) {
    axios({
      method: 'post',
      url: `${WP_API_ENDPOINT}/comments`,
      headers: { 'X-WP-Nonce': RT_API.nonce },
      data: params
    })
      .then(response => {
        dispatch({
          type: CREATE_COMMENT,
          payload: response.data
        });
      });
  }
}