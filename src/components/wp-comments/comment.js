import React, { Component } from 'react'
import { Comment as SuiComment } from 'semantic-ui-react'
import HTMLReactParser from 'html-react-parser'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { REPLY_TO } from './actions'


class Comment extends Component {

  componentDidMount(){
  }

  handleReply() {
    const { dispatch } = this.props
    dispatch({
      type: REPLY_TO,
      payload: {
        reply: {
          commentId: this.commentId,
          authorName: this.authorName,
          state: REPLY_TO
        }
      }
    })
  }

  isSelectedForReply(comment){
    const { comments } = this.props
    if(comments.reply.commentId === undefined) return false
    else return comments.reply.commentId === comment.id
  }

  render() {
    const { comment, children } = this.props
    this.commentId = comment.id
    this.authorName = comment.author_name

    return <SuiComment key={comment.id}><div>ID: {comment.id}</div>
      <SuiComment.Avatar src={comment.author_avatar_urls[96]} />
      <SuiComment.Content className={
          this.isSelectedForReply(comment) ? 'highlight' : ''}>
        {/*<SuiComment.Author as='a' href={comment.author_url}>{comment.author_name}</SuiComment.Author>*/}
        <SuiComment.Author>{comment.author_name}</SuiComment.Author>
        <SuiComment.Metadata><span>{comment.date.split('T').join(' ')}</span></SuiComment.Metadata>
        <SuiComment.Text>{HTMLReactParser(comment.content.rendered)}</SuiComment.Text>
        {!this.isSelectedForReply(comment) ? 
          <SuiComment.Actions as='a' onClick={this.handleReply.bind(this)}>Reply</SuiComment.Actions> : ''}
      </SuiComment.Content>
      {children}
    </SuiComment>
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dispatch }, dispatch)
}
function mapStateToProps({comments}){
  return { comments }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
