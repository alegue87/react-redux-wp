/* eslint-disable no-undef */
import axios from 'axios'

const PRETTYPERMALINK_ENDPOINT = `${RT_API.root}react-theme/v1/prettyPermalink/`;

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
}
export default new WpApi()