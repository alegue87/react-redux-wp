import React, { Component } from 'react'
import { Form, Button, Segment, Header, Loader, Input, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  createComment, fetchComments,
  REPLY_TO, INIT_COMMENT,
  CREATE_COMMENT, CREATING_COMMENT,
  CREATE_COMMENT_ERROR
} from './actions'

class CommentForm extends Component {
  componentDidMount() {
    this.postId = 0
    this.replyCommentId = 0
  }

  cancelReply() {
    const { dispatch } = this.props
    dispatch({
      type: INIT_COMMENT
    })
  }

  getValueFromId(id) {
    return document.getElementById(id).value
  }

  handleAddComment() {
    const { comments, post } = this.props
    const content = this.getValueFromId('comment-text')
    const parent = comments.comment.id || 0
    const author_name = this.getValueFromId('comment-name')
    const author_email = this.getValueFromId('comment-email')
    this.props.createComment({
      post: post.data.id,
      parent,
      author_name,
      author_email,
      content
    })
  }

  refreshComments() {
    this.props.fetchComments(this.props.post.data.id)
  }

  render() {
    const { state } = this.props.comments.comment

    let replyTo = ''
    let cancelButton = ''
    let loader = ''
    let info = ''
    const { post } = this.props
    const { comment } = this.props.comments
    switch (state) {
      case REPLY_TO:

        this.postId = post.data.id
        this.replyCommentId = comment.id

        replyTo =
          <Header as='h3'>Risposta a {comment.authorName}</Header>
        cancelButton =
          <Button content='Cancella risposta' primary icon='cancel' labelPosition='left'
            onClick={this.cancelReply.bind(this)}
          />
        break
      case CREATE_COMMENT:
        if (comment.response.data.status === 'hold') // approved, trash e spam ( stati di un commento)
          info = <Header color='green' as='h3'>Commento inserito! Ora è in attesa di approvazione</Header>
        else if (comment.response.data.status === 'approved')
          this.refreshComments()
        else {
          info = <Header color='green' as='h3'>Commento inviato.. ma non accettato</Header>
        }
        break
      case CREATE_COMMENT_ERROR:
        info = <Header color='red' as='h3'>{comment.response.data.message}</Header>
        break
      case CREATING_COMMENT:
        loader = <Loader active />
        break
      default: ;
    }

    return (
      <Form reply>
        {replyTo}
        <Form.TextArea id='comment-text' />
        <Input id='comment-name' placeholder='Nome' /> <br /> <br />
        <Input iconPosition='left' placeholder='Email' > <br /><br />
          <Icon name='at' />
          <input id='comment-email' />
        </Input> <br /><br />
        <Button content='Invia' labelPosition='left' icon='edit' primary
          onClick={this.handleAddComment.bind(this)} />

        {loader}
        {cancelButton}
        {info}
      </Form>

    )
  }

}


function mapStateToProps({ comments, post }) {
  return { comments, post }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createComment, fetchComments, dispatch }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)