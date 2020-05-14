import React from 'react'
import {connect} from 'react-redux';
//import { connect } from 'react-redux'
import Blog from './containers/blog';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component{
  render(){
    return(
      <Blog/>
    )
  }
}

export default App;