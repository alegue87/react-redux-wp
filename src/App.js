import React from 'react'
import {connect} from 'react-redux';
//import { connect } from 'react-redux'
import Blog from './containers/blog';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component{
  render(){    
    let page = this.props.page;
    return(
      <Blog page={page}/>
    )
  }
}
function mapStateToProps({page}){
  return {
    page: page
  }
}

export default connect(mapStateToProps)(App);