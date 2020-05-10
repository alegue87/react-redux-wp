/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPosts, ROUTER } from '../actions/index';

import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

class Blog extends Component {

  componentWillReceiveProps(nextProps) {/*
    console.log('COUNTER', 'Component blog receive props and dispatch');
    if (this.props.match.params.pageNum !== nextProps.match.params.pageNum || this.props.location.pathname !== nextProps.location.pathname) {
      this.props.fetchPosts(nextProps.match.params.pageNum || 1);
      this.props.dispatch({
        type: ROUTER,
        payload: nextProps.match
      });
    }*/
  }

  componentDidUpdate() {
    document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
  }

  render() {
    let page;
    if(this.props.page === 'NotFound'){
      page = (<div>404: Not found!</div>)
      document.title = `${RT_API.siteName} - Not found`
    }
    else{
      page = <Main/>
    }
    return (
      <section className="container-fluid template-blog">
        <Header />
        {page}
        <Footer />
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({ fetchPosts, dispatch }), dispatch)
}

function mapStateToProps(state){
  return {
    page: state.page
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)