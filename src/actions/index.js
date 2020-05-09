export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';

export function fetchPost(postId = 0) {

  return function (dispatch, getState, bag) {
    // bag
    // - action.payload.(:postId)
    // - action.type
    // postId non settato se il dispatch proviene da thunk
    postId = postId || bag.action.payload.postId;
    // altrimenti proviene dal componente ( postId != 0 )
    setTimeout(() => {
      // fake async call
      dispatch({ type: FETCH_POST, payload:'POST ID: ' + postId });
    }, 500);
  }
}

export function fetchPosts(){
  return (dispatch, getState, bag) => {
    setTimeout(()=>{
      dispatch({type:FETCH_POSTS, payload:['POST1', 'POST2', 'POST3']})
    },300)
  }
}
