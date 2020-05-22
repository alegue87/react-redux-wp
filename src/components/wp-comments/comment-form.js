import React, { Component } from 'react'
import { Form, Button, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { REPLY_TO, INIT_REPLY } from './actions'

class CommentForm extends Component {
  componentDidMount() {
    this.postId = 0
    this.replyCommentId = 0
  }

  cancelReply() {
    const { dispatch } = this.props
    dispatch({
      type: INIT_REPLY
    })
  }

  render() {
    const { state } = this.props.comments.reply
    console.log(state)

    let replyTo = ''
    let cancelButton = ''
    if (state === REPLY_TO) {
      console.log('reply')
      const { post } = this.props
      const { reply } = this.props.comments
      this.postId = post.data.id
      this.replyCommentId = reply.commentId

      replyTo =
        <Header as='h3'>Risposta a {reply.authorName}</Header>
      cancelButton =
        <Button content='Cancella risposta' primary icon='cancel' labelPosition='left'
          onClick={this.cancelReply.bind(this)}
        />
    }

    return (
      <Form reply>
        {replyTo}
        <Form.TextArea />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        {cancelButton}
      </Form>
    )
  }

}


function mapStateToProps({ comments, post }) {
  return { comments, post }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dispatch }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)