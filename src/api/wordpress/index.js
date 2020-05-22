/* eslint-disable no-undef */
import axios from 'axios'

const PRETTYPERMALINK_ENDPOINT = `${RT_API.root}react-theme/v1/prettyPermalink/`;
const WP_API_ENDPOINT = `${RT_API.root}wp/v2`;
const MENU_ENDPOINT = `${RT_API.root}react-theme/v1/menu-locations/`;

class WpApi {

  fetchPostFromSlug = (slug) => {
    return new Promise((fulfill, reject) => {
      axios.get(`${PRETTYPERMALINK_ENDPOINT}${slug}`)
        .then(response => {
          fulfill(response)
        })
        .catch(error => reject(error));
    })
  }

  fetchTaxInfo = (tax, slug) => {
    return new Promise((fulfill, reject) => {
      axios.get(`${WP_API_ENDPOINT}/${tax}?slug=${slug}`)
        .then(response => {
          fulfill(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  fetchPosts = (post_type = 'posts', context = '_embed', per_page = 10, page = 1, tax_query = '') => {
    return new Promise((fulfill, reject) => {
      axios.get(`${WP_API_ENDPOINT}/${post_type}?${context}&per_page=${per_page}&page=${page}${tax_query}`)
        .then(response => {
          fulfill(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  fetchMenu = (menu) => {
    return new Promise((fulfill, reject) => {
      axios.get(`${MENU_ENDPOINT}${menu}`)
        .then(response => fulfill(response))
        .catch(error => reject(error))
    })
  }

  searchSite = (term, post_type = 'posts') => {
    return new Promise((fulfill, reject) => {
      axios.get(`${WP_API_ENDPOINT}/${post_type}?_embed&search=${term}`)
        .then(response => fulfill(response))
        .catch(error => reject(error))
    })
  }

  fetchComments = (postId) => {
    return new Promise((fulfill, reject) => {
      axios.get(`${WP_API_ENDPOINT}/comments?post=${postId}&orderby=parent&per_page=100`)
        .then(response => fulfill(response))
        .catch(error => reject(error))
    })
  }

  createComment = (params = { post: 0, parent: 0, author_name: '', author_email: '', content: ''}) => {
    return new Promise((fullfill, reject) => {
      axios({
        method: 'post',
        url: `${WP_API_ENDPOINT}/comments`,
        headers: { 'X-WP-Nonce': RT_API.nonce },
        data: params
      })
        .then(response => fullfill(response))
        .catch(error => reject(error))
    })
  }

}

export default new WpApi()