import React from 'react';
import { Grid, Label, Icon, Loader, Visibility } from 'semantic-ui-react';
import PostCard from './../../components/main/PostCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchPosts, FETCHING_POSTS, INIT_POSTS } from '../../actions'

class PostsCard extends React.Component {
  constructor(props) {
    super(props)
    this.perColumn = 4
    this.state = { loadingPosts: false }
  }

  fetchPosts() {
    let totalPages = this.props.posts.totalPages
    if (this.props.posts.page < totalPages) {
      this.props.fetchPosts({
        post_type: 'posts',
        per_page: this.perColumn*2,
        page: this.props.posts.page + 1,
        tax: this.props.tax,
        appendToPreviousPosts: true, // append mode on
      })
    }
  }

  componentDidMount() {
    if (this.props.posts.state === INIT_POSTS) {
      this.fetchPosts()
    }
  }

  componentDidUpdate() {
    // Nel caso la location sia stata cambiata
    if (this.props.posts.state === INIT_POSTS) {
      this.fetchPosts();
    }
  }

  renderCardsRows(posts) {
    const perColumn = this.perColumn
    let rows = [];
    for (let i = 0; i < posts.length; i += perColumn) {
      let cols = []
      for (let k = i; k < i + perColumn; k++) {
        let card;
        if (k < posts.length) {
          card = <PostCard style={{ height: '100%' }} key={posts[k].id} post={posts[k]} />
        }
        else {
          card = ''
        }
        cols.push(
          <Grid.Column key={k} width={perColumn}>
            {card}
          </Grid.Column>
        )
      }
      let row = <Grid.Row key={i}>{cols}</Grid.Row>
      rows.push(row)
    }
    return rows

  }

  render() {
    return (
      <Visibility
        once={false}
        onBottomVisible={this.fetchPosts.bind(this)}
      >
        <Grid id={'cards'} container stackable centered>
          {this.props.posts.list.length > 0 && this.renderCardsRows(this.props.posts.list)}
          <Grid.Row>
            <Label>
              {this.props.posts.page < this.props.posts.totalPages && (<Icon name='angle double down' />)}
              {this.props.posts.list.length}/{this.props.posts.total} Posts</Label>
            {this.props.posts.state === FETCHING_POSTS && <Loader active />}
          </Grid.Row>
        </Grid>
      </Visibility>
    )
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts, dispatch }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsCard)

