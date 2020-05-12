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
export const ROUTER = 'ROUTER';


const WP_API_ENDPOINT = `${RT_API.root}wp/v2`;
const PRETTYPERMALINK_ENDPOINT = `${RT_API.root}react-theme/v1/prettyPermalink/`;
const MENU_ENDPOINT = `${RT_API.root}react-theme/v1/menu-locations/`;

export function fetchPosts(pageNum = 1, post_type = 'posts') {
  return function (dispatch, getState, bag) {
    if (bag !== undefined) { // called from thunk
      pageNum = bag.action.payload.pageNum || pageNum;
    }
    axios.get(`${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}`)
      .then(response => {
        dispatch({
          type: FETCH_POSTS,
          payload: {
            list: response.data,
            totalPages: response.headers['x-wp-totalpages'],
            total: response.headers['x-wp-total']
          }
        });
      });
  }
}

export function fetchPostsFromTax(tax = 'categories', taxId = 0, pageNum = 1, post_type = 'posts') {
  return function (dispatch, getState, bag) {
    if (bag !== undefined) {
      // l'evento proviene da un click di un link o dalla navigazione.
      // taxId non è un vero e proprio parametro ( vedi rotte ),
      // ma è utilizzato al posto dello slug per effettuare una sola
      // richiesta dei posts invece che due, e viene utilizzato lo 
      // slug nel link per renderlo più leggibile.
      taxId = bag.action.payload.taxId;
      let slug = bag.action.payload.slug;
      if(taxId === undefined){ // in caso di reload della pagina
                               // lo stato precedente viene perso
                               // e non è possibile recuperare i
                               // posts dato che manca il taxId..
                               // recuperare il taxId o salvare lo 
                               // stato di redux da qualche parte?
        const state = getState()
        if(state.posts.list  !== undefined){
          state.posts.list.map((post)=>{
            if(post.categories)
              post.categories.map((cat) => {
                cat.name === slug && (taxId = cat.id);
              })
          })
        }        
      }
    }
    const url = `${WP_API_ENDPOINT}/${post_type}?_embed&${tax}=${taxId}&page=${pageNum}`;
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
      tax = bag.action.payload.tax;
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
          payload: response.data
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