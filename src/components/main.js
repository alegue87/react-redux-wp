import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//import Article from './main/article';
import Link from 'redux-first-router-link'
import { fetchPost } from '../actions';
import {BLOG_PAGE, BLOG} from '../pages'

class Main extends Component {

  render() {
    let title;
    if(this.props.locationType === BLOG_PAGE){
      title = 'Single post'
    }else{
      title = 'Multiple posts'
    }
    title += ' ' + this.props.locationType;

    return (

      <div style={{display:'flex', flexDirection:'column'}}>
        <h1>{title}</h1>
        <Link style={navLink} to={{ type: BLOG }}>Blog</Link>
        <Link style={navLink} to={{ type: BLOG_PAGE, payload: { postId: 5 } }}>Link to specific /post/5</Link>
        <br></br>
        <a style={navLink} onClick={() => { this.props.fetchPost(10) }}>Prendi post con id 10</a>
        <br></br>
        Post o posts - {this.props.posts}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    posts: state.posts,
    locationType: state.location.type
  };
}

function mapDispatchToProps(dispatch) {
  // const functionsWrapper = Object.assign({ fetchPosts, dispatch }) // === 
  /*
  const functionsWrapper = {
    fetchPost,
    dispatch
  }
  */
  const funcWrap = { fetchPost }
  return bindActionCreators(funcWrap, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)


const navLink = {
  backgroundColor: "blue",
  padding: "1rem 2rem",
  margin: "1rem",
  color: "white"
};
