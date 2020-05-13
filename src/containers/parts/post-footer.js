import React, { Component } from 'react';
import Link from 'redux-first-router-link';
import { TAG } from '../../actions'
import Comments from '../comments/comments';

class PostFooter extends Component {

  renderTags(tags) {
    return tags.map( (tag) => {
      return (
        <span key={tag.id} style={{marginRight:'5px'}}>
          <Link  to={{
            type:TAG, 
                                    // Viene visualizzato lo slug nell'url
            payload:{               // ma utilizzato il taxId per richiedere
              slug:tag.slug,        // i posts
              taxId:tag.id,
              name:tag.name              
            }
          }}>{tag.name}</Link>
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