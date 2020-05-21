import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Comment, Header, Loader, Container } from 'semantic-ui-react'
import { fetchComments, INIT_COMMENTS, FETCHING_COMMENTS, FETCH_COMMENTS_ERROR, FETCH_COMMENTS } from './actions'
import { FETCH_POST } from '../article/actions'

const STATUS_OPEN = 'open'
class WpComments extends Component {

  componentDidMount() {
    this.comment_status = ''
  }

  getComments() {
    return ''
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
      content = this.getComments()
    }

    if (this.comment_status === STATUS_OPEN)
      return (
        <Comment.Group>
          <Header as='h2' dividing>Commenti</Header>
          {content}
        </Comment.Group>)
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