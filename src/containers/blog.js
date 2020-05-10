/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPosts } from '../actions/index';

import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

class Blog extends Component {

  componentDidMount(){
    // eslint-disable-next-line no-undef
    window.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
  }
  render() {
    return (
      <section className="container-fluid template-blog">
        <Header />
        <Main />
        <Footer />
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({ fetchPosts, dispatch }), dispatch)
}


export default connect(null, mapDispatchToProps)(Blog)