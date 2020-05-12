/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BLOG, BLOG_PAGE, HOME, SINGLE, TAG, CATEGORY } from '../pages';
import { fetchPosts, fetchPostsFromTax, FETCH_CAT_INFO, FETCH_TAG_INFO } from '../actions/index';

import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

class Blog extends Component {
  constructor(){
    super()
    this.pageNum = 1;
  }

  componentDidMount() {
    document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
  }
  componentDidUpdate() {
    // 
    const sitename = `${RT_API.siteName}`;
    switch (this.props.page) {
      case BLOG:
      case HOME:
        this.pageNum = 1
        break;
      case BLOG_PAGE:
        this.pageNum = this.props.pageNum;
        document.title += sitename + ` Page ${this.props.pageNum}`;
        break;
      case SINGLE:
        document.title += sitename + 'Single';
        break;
      case TAG:
        document.title += sitename + 'Tag';
        break;
      case CATEGORY:
        document.title += sitename + 'Category';
        break;
      default:
        ;
    }
  }
  render() {
    return (
      <section className="container-fluid template-blog">
        <h1>Numero pagina: {this.pageNum}</h1>
        <Header />
        <Main pageNum={this.pageNum} />
        <Footer />
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({ fetchPostsFromTax, dispatch }), dispatch)
}
function mapStateToProps(state) {
  return { 
    cat: state.cat,
    tag: state.tag,
    pageNum: state.location.payload.pageNum
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
