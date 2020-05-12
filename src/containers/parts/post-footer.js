import React, { Component } from 'react';
import Link from 'redux-first-router-link';
import { TAG } from '../../pages'
import Comments from '../comments/comments';

class PostFooter extends Component {

  renderTags(tags) {
    return tags.map( (tag) => {
      return (
        <span key={tag.id} style={{marginRight:'5px'}}>
          <Link  to={{type:TAG, payload:{slug:tag.slug, tax:'tags'}}}>{tag.name}</Link>
        </span>
        )
    })
  }

  shouldShowFooter() {
    return (this.props.tags.list.length > 0 || this.props.commentStatus !== 'closed');
  }

  render() {
    return(
      <footer className="card-footer">
        {this.props.tags !== undefined && this.renderTags(this.props.tags)}
        <hr />
        {(this.props.commentStatus !== 'closed' && this.props.isSingle) && <Comments pId={this.props.pId} />}
      </footer>
    );
  }
}

export default PostFooter;