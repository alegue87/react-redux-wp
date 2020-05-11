import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import { TAG } from '../../pages'

import { fetchTaxInfo } from '../../actions';

import Comments from '../comments/comments';

class PostFooter extends Component {
  componentWillMount(){
    this.renderedTags = null
    this.props.fetchTaxInfo('tags', this.props.pId, this.props.tagIds)
  }

  renderTags(tags) {
    return tags.map( (tag) => {
      return (<span key={tag.id} style={{marginRight:'5px'}}><Link  to={{type:TAG, payload:{id:tag.id}}}>{tag.name}</Link></span>)
    })
  }

  shouldShowFooter() {
    return (this.props.tags.list.length > 0 || this.props.commentStatus !== 'closed');
  }

  // Aggiorna componente solo quando i tags ricevuti
  // fanno parte del post
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.pId === nextProps.tags.postId)
      return true
    else
      return false
  }

  render() {
    if(this.props.tags.postId === this.props.pId){
      this.renderedTags = this.renderTags(this.props.tags.list)
    }
    return(
      <footer className="card-footer">
        {this.renderedTags}
        <hr />
        {(this.props.commentStatus !== 'closed' && this.props.isSingle) && <Comments pId={this.props.pId} />}
      </footer>
    );
  }
}

function mapStateToProps({ tags }) {
  return { tags };
}

export default connect(mapStateToProps, { fetchTaxInfo })(PostFooter);