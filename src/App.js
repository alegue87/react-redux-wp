import React from 'react'
//import { connect } from 'react-redux'
import Blog from './containers/blog';

/*
const NotFound = () => { return(<div>404: Not found!</div>)}

const containers = {Blog, NotFound}
const App = ({ page }) => {
  const Container = containers[page]
  return <Container />
}

const mapStateToProps = ({ page }) => ({ page })

export default connect(mapStateToProps)(App)
*/
class App extends React.Component{
  render(){
    return(
      <Blog/>
    )
  }
}

export default App;