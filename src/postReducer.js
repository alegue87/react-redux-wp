
var POSTS = 'POSTS'; // From action

export default (state=[], action) => { 
  console.log('POSTS reducer')
  console.log(action)
  switch(action.type) {
    case POSTS:
      return action.payload;
    default:
      return state;
  }
}