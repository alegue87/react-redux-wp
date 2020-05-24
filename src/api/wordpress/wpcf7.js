
import axios from 'axios'

// eslint-disable-next-line no-undef
const ENDPOINT = `${RT_API.root}contact-form-7/v1/contact-forms`

class WPCF7_API {

  createFeedback(params = { id: 0, data: {} }) {
    return new Promise((fulfill, reject) => {
      const endpoint_name = 'feedback'
      axios({
        method: 'post',
        url: `${ENDPOINT}/${params.id}/${endpoint_name}`,
        headers: {
          'content-type': 'multipart/form-data'
        },
        data: params.data
      })
        .then(response => fulfill(response))
        .catch(error => reject(error))
    })
  }
}

export default new WPCF7_API()
