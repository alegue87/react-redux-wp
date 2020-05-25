import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Comment as SuiComment, Header, Loader, Container } from 'semantic-ui-react'
import { fetchComments, INIT_COMMENTS, FETCHING_COMMENTS, FETCH_COMMENTS_ERROR, FETCH_COMMENTS } from './actions'
import { FETCH_POST } from '../article/actions'
import Comment from './comment'
import CommentForm from './comment-form'
import './wp-comments.css'

const STATUS_OPEN = 'open'
class WpComments extends Component {

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
    if (_.isEmpty(nestedComments))
      return
    else {
      return (
        <SuiComment.Group threaded >
          {
            Object.keys(nestedComments).map(commentId => {
              const comment = nestedComments[commentId].comment;
              return (
                <Comment key={comment.id} comment={comment}>
                  {this.renderNestedComments(nestedComments[comment.id].children)}
                </Comment>
              )
            })
          }
        </SuiComment.Group>
      )
    }
  }

  isPostReady(){
    const { post } = this.props
    return post.state === FETCH_POST
  }
  areCommmentsOpen(){
    const { post } = this.props
    return post.data.comment_status === STATUS_OPEN
  }

  componentDidUpdate() {
    const { comments, post } = this.props
    if (this.isPostReady() && comments.state === INIT_COMMENTS) {
      if(this.areCommmentsOpen())
        this.props.fetchComments(post.data.id)
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
      if (this.nestComments(comments.list)[0] !== undefined)
        content = (
          <div >
            {this.renderNestedComments(this.nestComments(comments.list)[0].children)}
            <CommentForm />
          </div>
        )
      else
        content = <CommentForm />
    }

    if (this.isPostReady() && this.areCommmentsOpen())
      return (
        <Container text id='comments'>
          <Header as='h2' dividing>Commenti</Header>
          {content}
        </Container>)
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

