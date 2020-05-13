/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  fetchPostsFromTax, 
  BLOG, BLOG_PAGE, HOME, SINGLE, TAG, CATEGORY } from '../actions/index';
import {NOT_FOUND} from 'redux-first-router';
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
    document.title = `${RT_API.siteName}`;
    switch (this.props.locationType) {
      case BLOG:
      case HOME:
        this.pageNum = 1
        break;
      case BLOG_PAGE:
        this.pageNum = this.props.pageNum*1;
        document.title += ` - Page ${this.props.pageNum}`;
        break;
      case SINGLE:
        document.title += ' - Single';
        break;
      case TAG:
        document.title += ' - Tag';
        break;
      case CATEGORY:
        document.title += ' - Category';
        break;
      case NOT_FOUND:
        document.title += ' - Not found';
        break;
      default:
        ;
    }
  }
  render() {
    this.preRender()
    const NotFound = () => (<div>404</div>)
    return (
      <section className="container-fluid template-blog">
        <h1>Numero pagina: {this.pageNum}</h1>
        <Header />
        {this.props.locationType === NOT_FOUND ? <NotFound/> : <Main pageNum={this.pageNum} />}
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
