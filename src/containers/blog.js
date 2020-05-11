/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BLOG, BLOG_PAGE, HOME, SINGLE, TAG, CATEGORY } from '../pages';
import { fetchPosts, fetchPostsFromTax, FETCH_CAT_INFO } from '../actions/index';

import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

class Blog extends Component {

  componentDidMount() {
    // eslint-disable-next-line no-undef
    document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;

  }
  componentDidUpdate() {
    const sitename = `${RT_API.siteName}`;
    switch (this.props.page) {
      case BLOG:
      case BLOG_PAGE: // pageNum ..
      case HOME:
        document.title = document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
        break;
      case SINGLE:
        document.title = sitename + ' ' + 'Single page';
        break;
      case TAG:
        document.title = sitename + ' ' + 'Tag page';
        break;
      case CATEGORY:
        document.title = sitename + ' ' + 'Category page';
        break;
      case FETCH_CAT_INFO:
        const cat = this.props.cat;
        this.props.fetchPostsFromTax('categories', cat[0].id);
      default:
        ;
    }
  }
  render() {
    return (
      <section className="container-fluid template-blog">
        <h1>{this.props.page}</h1>
        <Header />
        <Main page={this.props.page} />
        <Footer />
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({ fetchPostsFromTax, dispatch }), dispatch)
}
function mapStateToProps({ cat }) {
  return { cat }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
