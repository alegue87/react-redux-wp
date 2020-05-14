/* eslint-disable no-undef */
import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const SEARCH_POSTS = 'SEARCH_POSTS';
export const CATEGORY_POSTS = 'CATEGORY_POSTS';
export const FETCH_CAT_INFO = 'FETCH_CAT_INFO';
export const FETCH_TAG_INFO = 'FETCH_TAG_INFO';
export const FETCH_MENU = 'FETCH_MENU';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
// Pages ( state.location.type )
export const HOME = 'HOME';
export const BLOG = 'BLOG';
export const BLOG_PAGE = 'BLOG_PAGE';
export const SINGLE = 'SINGLE';
export const TAG = 'TAG';
export const CATEGORY = 'CATEGORY';

const WP_API_ENDPOINT = `${RT_API.root}wp/v2`;
const PRETTYPERMALINK_ENDPOINT = `${RT_API.root}react-theme/v1/prettyPermalink/`;
const MENU_ENDPOINT = `${RT_API.root}react-theme/v1/menu-locations/`;

export function fetchPosts({
    post_type = 'posts',
    per_page = 1,
    page = 1,
    tax = {type:'', id: 0},
    context = '_embed'
  }) {
  let tax_query = ''
  if(tax.type !== ''){
    tax_query = `&${tax.type}=${tax.id}`
  }
  return function (dispatch, getState, bag) {
    let postsUrl = `${WP_API_ENDPOINT}/${post_type}?${context}&per_page=${per_page}&page=${page}${tax_query}`
    axios.get(postsUrl)
      .then(response => {
        dispatch({
          type: FETCH_POSTS,
          payload: {
            list: response.data,
            totalPages: response.headers['x-wp-totalpages'],
            total: response.headers['x-wp-total'],
            page: page
          }
        });
      });
  }
}

export function fetchPostsFromTax(tax = 'categories', taxId = 0, post_type = 'posts') {
  return function (dispatch, getState, bag) {
    let slug = ''
    if (bag !== undefined) {
      taxId = bag.action.payload.taxId // da click su link
      slug = bag.action.payload.slug
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

export function fetchPost(prettyPermalink) {
  return function (dispatch, getState, bag) {
    if (bag !== undefined)
      prettyPermalink = bag.action.payload.slug || prettyPermalink;

    axios.get(`${PRETTYPERMALINK_ENDPOINT}${prettyPermalink}`)
      .then(response => {
        dispatch({
          type: FETCH_POST,
          payload: {
            list: [response.data]
          }
        });
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

export function fetchMenu(menu) {
  return function (dispatch) {
    axios.get(`${MENU_ENDPOINT}${menu}`)
      .then(response => {
        dispatch({
          type: FETCH_MENU,
          payload: { items: response.data, name: menu }
        });
      });
  }
}

export function searchSite(term, post_type = 'posts') {
  return function (dispatch) {
    axios.get(`${WP_API_ENDPOINT}/${post_type}?_embed&search=${term}`)
      .then(response => {
        dispatch({
          type: SEARCH_POSTS,
          payload: {
            list: response.data
          }
        });
      })
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