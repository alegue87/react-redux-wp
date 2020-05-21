import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Comment, Header, Loader, Container } from 'semantic-ui-react'
import { fetchComments, INIT_COMMENTS, FETCHING_COMMENTS, FETCH_COMMENTS_ERROR, FETCH_COMMENTS } from './actions'
import { FETCH_POST } from '../article/actions'
import HTMLReactParser from 'html-react-parser'
import './wp-comments.css'

const STATUS_OPEN = 'open'
class WpComments extends Component {

  componentDidMount() {
    this.comment_status = ''
  }

  getComments() {
    return ''
  }

  nestComments(comments) {
    const nestedComments = {};
    for (const comment of comments) {
      if (comment.id in nestedComments) {
        nestedComments[comment.id].comment = comment;
      } else {
        nestedComments[comment.id] = { comment: comment, children: {} };
      }

      if (comment.parent in nestedComments) {
        nestedComments[comment.parent].children[comment.id] = nestedComments[comment.id];
        delete nestedComments[comment.id];
      } else {
        nestedComments[comment.parent] = { comment: {}, children: {} };
        nestedComments[comment.parent].children[comment.id] = nestedComments[comment.id];
        delete nestedComments[comment.id];
      }

    }

    return nestedComments;
  }


  renderNestedComments(nestedComments) {
    return (
      <Comment.Group threaded>
        {Object.keys(nestedComments).map(commentId => {
          const comment = nestedComments[commentId].comment;
          return (
            <Comment key={commentId}>
              {comment.id ?
                <div>
                  <Comment.Avatar src={comment.author_avatar_urls[48]} />
                  <Comment.Content>
                    <Comment.Author as='a' href={comment.author_url}>{comment.author_name}</Comment.Author>
                    <Comment.Metadata><div>{comment.date}</div></Comment.Metadata>
                    <Comment.Text>{HTMLReactParser(comment.content.rendered)}</Comment.Text>
                    <Comment.Actions>Reply</Comment.Actions>
                  </Comment.Content>
                </div>
                : ''}
              {this.renderNestedComments(nestedComments[commentId].children)}
            </Comment>
          )
        })}
      </Comment.Group>)
  }

  componentDidUpdate() {
    const { comments, post } = this.props
    if (post.state === FETCH_POST && comments.state === INIT_COMMENTS) {
      if (post.data.comment_status === STATUS_OPEN) {
        this.comment_status = STATUS_OPEN
        this.props.fetchComments(post.data.id)
      }
    }
  }
  render() {
    const { comments } = this.props

    let content = ''
    if (comments.state === FETCHING_COMMENTS) {
      content = <Loader active />
    }
    else if (comments.state === FETCH_COMMENTS_ERROR) {
      content = 'Errore nel recupero dei commenti'
    }
    else if (comments.state === FETCH_COMMENTS) {
      content = this.renderNestedComments(this.nestComments(comments.list))
    }

    if (this.comment_status === STATUS_OPEN)
      return (
        <div>
          <Header as='h2' dividing>Commenti</Header>
          {content}
        </div>)          
    else {
      return ('')
    }
  }
}

function mapStateToProps({ comments, post }) {
  return { comments, post }
}
function mapStateToDispatch(dispatch) {
  return bindActionCreators({ fetchComments }, dispatch)
}

export default connect(mapStateToProps, mapStateToDispatch)(WpComments)