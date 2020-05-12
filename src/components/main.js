import React, { Component } from 'react';
import { connect } from 'react-redux';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Article from './main/article';
import Empty from './main/empty';
import PageNav from '../containers/parts/page-nav';

class Main extends Component {
  componentWillUpdate() {
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps() {
  }

  isSingle() {
    if(this.props.posts.list)
      return 1 === this.props.posts.list.length;
  }

  renderPosts(posts) {
    if (posts && posts.length) {
      return posts.map(post => {
        return (<Article key={post.id}
          post={post}
          isSingle={this.isSingle()} />);
      });
    } else {
      const counter = [...Array(20)];
      return counter.map((val, i) => {
        return (<Empty key={i} />);
      });
    }
  }

  getClasses() {
    return this.isSingle() ? '' : 'card-columns';
  }

  render() {
    let shouldRender = false
    if (this.props.posts.list !== undefined)
      if (this.props.posts.total > this.props.posts.list.length)
        shouldRender = true

    return (
      <div>
        <main id="postsContainer" className={this.getClasses()}>{/*
        <ReactCSSTransitionGroup
						transitionName="fade"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={1}>
						{this.renderPosts(this.props.posts)}
					</ReactCSSTransitionGroup>
        */}
          {this.renderPosts(this.props.posts.list)}

        </main>
        <PageNav
          shouldRender={shouldRender}
          pageNum={this.props.pageNum}
          totalPages={this.props.posts.totalPages}
        />
      </div>
    );
  }
}


function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps, null)(Main)
