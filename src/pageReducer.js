
export default (state = [], action = {}) => {
  console.log(action.type)
  return action.type || state;
}
  