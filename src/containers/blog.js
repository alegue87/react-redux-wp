/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  fetchPostsFromTax, 
  BLOG, BLOG_PAGE, HOME, SINGLE, TAG, CATEGORY, FETCH_CAT_INFO } from '../actions/index';

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
  
  preRender() {
    const sitename = `${RT_API.siteName}`;
    switch (this.props.locationType) {
      case BLOG:
      case HOME:
        this.pageNum = 1
        break;
      case BLOG_PAGE:
        this.pageNum = this.props.pageNum*1;
        document.title += sitename + ` Page ${this.props.pageNum}`;
        break;
      case SINGLE:
        document.title += sitename + ' Single';
        break;
      case TAG:
        document.title += sitename + ' Tag';
        break;
      case CATEGORY:
        document.title += sitename + ' Category';
        break;
      default:
        ;
    }
  }
  render() {
    this.preRender()
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
    pageNum: state.location.payload.pageNum,
    locationType: state.location.type
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
