import React, { Component } from 'react';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import { BLOG_PAGE } from '../../pages';

class PageNav extends Component {
  getPrevPage() {
    const pageNum = parseInt(this.props.routerMatch.params.pageNum) || 1;
    return (pageNum > 2) ? `${this.getSlug()}/page/${pageNum - 1}/` : `/`;
  }

  getSlug() {
    if (('undefined' !== typeof this.props.routerMatch.params.slug || 'undefined' !== typeof this.props.routerMatch.params.term) && 'undefined' !== typeof this.props.routerMatch.url) {
      let tax = 'category';
      let urlParts = this.props.routerMatch.url.split('/');
      if (urlParts.length) {
        urlParts = urlParts.filter(part => {
          return "" !== part && this.props.routerMatch.params.slug !== part
        });
        if (urlParts.length) {
          tax = urlParts[0];
        }
      }
      let slug = this.props.routerMatch.params.slug || this.props.routerMatch.params.term;
      return `/${tax}/${slug}`;
    } else {
      return "";
    }
  }

  getNextPage() {
    const pageNum = parseInt(this.props.routerMatch.params.pageNum) || 1;
    return `${this.getSlug()}/page/${pageNum + 1}/`;
  }

  render() {
    if (this.props.shouldRender) {
      let Next = null;
      let Prev = null;
      if (this.props.pageNum < this.props.totalPages) {
        Next = <Link to={{ type: BLOG_PAGE, payload: { pageNum: this.props.pageNum + 1 } }}>Next</Link>
      }
      if (this.props.pageNum > 1) {
        Prev = <Link to={{ type: BLOG_PAGE, payload: { pageNum: this.props.pageNum - 1 } }}>Prev</Link>
      }
      return (
        <div className="nav justify-content-center">
          <div className="nav-item">
            {Prev}
          </div>
                    &nbsp;
          <div className="nav-item">
            {Next}
          </div>
        </div>
      );
    } else {
      return <span />;
    }
  }
}

function mapStateToProps({ routerMatch }) {
  return { routerMatch };
}

export default connect(mapStateToProps)(PageNav);