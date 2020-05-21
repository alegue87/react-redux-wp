import WpApi from '../../api/wordpress/index'
export const FETCH_MENU = 'FETCH_MENU';
export const FETCH_MENU_ERROR = 'FETCH_MENU_ERROR'

export function fetchMenu(name) {
  return (dispatch, getState, bag) => {
    WpApi.fetchMenu(name)
      .then((response) => {
        dispatch({
          type: FETCH_MENU,
          payload: { items: response.data, name: name }
        });
      })
      .catch( error => {
        dispatch({
          type: FETCH_MENU_ERROR,
          payload: ''
        })
      })
  }
}