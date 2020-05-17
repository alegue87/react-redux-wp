import React from 'react';
import { Grid, Segment, Label, Icon, Loader } from 'semantic-ui-react';
import PostCard from './../../components/main/PostCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchPosts, resetPosts,
  TAG, CATEGORY, HOME, FETCH_POSTS, FETCH_CAT_INFO, FETCH_TAG_INFO, FETCHING_POSTS } from '../../actions'

class PostsCard extends React.Component {
  constructor(props) {
    super(props)
    this.perPage = 4
    this.locationPathname = ''
    this.state = { loadingPosts: false }
  }

fetchPosts() {
  let totalPages = this.props.posts.totalPages
  let tax = {
    type: '',
    id: 0
  }
  if (this.props.posts.page < totalPages) {
    switch (this.props.location.type) {
      case CATEGORY:
        tax.type = 'categories'
        tax.id = this.props.cat.taxId;
        break;
      case TAG:
        tax.type = 'tags'
        tax.id = this.props.tag.taxId;
        break;
      default: ;
    }
    
    this.props.fetchPosts({
      post_type: 'posts',
      per_page: this.perPage,
      page: this.props.posts.page + 1,
      tax
    })

    this.props.dispatch({
      type: FETCHING_POSTS
    })
  }
}
onScrollFetchPosts = (e) => {
  this.fetchPosts.bind(this)();
}
componentDidMount() {
  window.addEventListener('scroll', this.onScrollFetchPosts)
  this.locationPathname = this.props.location.pathname
  this.fetchPosts();
}

componentWillUnmount(){
  window.removeEventListener('scroll', this.onScrollFetchPosts)
  this.props.resetPosts();
}

componentDidUpdate() {
  if (this.locationPathname !== this.props.location.pathname) {
    if (this.props.posts.list.length > 0)
      this.props.resetPosts()
    if (this.props.action=== HOME || this.props.action=== FETCH_CAT_INFO || this.props.action=== FETCH_TAG_INFO) {
      this.locationPathname = this.props.location.pathname
      this.fetchPosts()  // Carica primi posts
    }
  }
  if (this.props.action=== FETCH_POSTS && this.state.loadingPosts) {
    this.setState({ loadingPosts: false })
  }
}
renderCardsRows(posts) {
  const forColumn = this.perPage
  let rows = [];
  for (let i = 0; i < posts.length; i += forColumn) {
    let cols = []
    for (let k = i; k < i + forColumn; k++) {
      let card;
      if (k < posts.length) {
        card = <PostCard style={{ height: '100%' }} key={posts[k].id} post={posts[k]} />
      }
      else {
        card = ''
      }
      cols.push(
        <Grid.Column key={k} width={forColumn}>
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
    <Grid id={'cards'} container stackable centered>
      {this.props.posts.list.length > 0 && this.renderCardsRows(this.props.posts.list)}
      <Grid.Row>
        <Label>
          {this.props.posts.page < this.props.posts.totalPages && (<Icon name='angle double down'/>)}
          {this.props.posts.list.length}/{this.props.posts.total} Posts</Label>
        {this.props.action=== FETCHING_POSTS && <Loader active />}
      </Grid.Row>
    </Grid>
  )
}
}

function mapStateToProps({ posts, location, cat, tag, action }) {
  return { posts, location, cat, tag, action };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts, resetPosts, dispatch }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsCard)

