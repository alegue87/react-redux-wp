import React, { Component } from 'react'
import { Form, Button, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { REPLY_TO } from './actions'

class CommentForm extends Component {
  componentDidMount() {
    this.postId = 0
    this.replyCommentId = 0
  }

  render() {
    const { state } = this.props.comments.reply
    console.log(state)

    let replyTo = ''
    if (state === REPLY_TO) {
      console.log('reply')
      const { post } = this.props
      const { reply } = this.props.comments
      this.postId = post.data.id
      this.replyCommentId = reply.commentId

      replyTo =
        <Header as='h3'>Risposta a {reply.authorName}</Header>
    }

    return (
      <Form reply>
        {replyTo}
        <Form.TextArea />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    )
  }

}


function mapStateToProps({ comments, post }) {
  return { comments, post }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ dispatch}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)