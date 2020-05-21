import React from 'react';
import { Grid, Label, Icon, Loader, Visibility, Header, Container } from 'semantic-ui-react';
import PostCard from '../post-card/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
  fetchPosts,
  INIT_POSTS, FETCHING_POSTS,
  FETCH_CAT_INFO, FETCH_TAG_INFO,
  FETCH_CAT_INFO_ERROR, FETCH_TAG_INFO_ERROR, FETCH_POSTS_ERROR
} from './actions'
import { HOME, CATEGORY, TAG } from '../../routes/index'

class CardsLoader extends React.Component {
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
        per_page: this.perColumn * 2,
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

  getContent() {
    const { posts, cat, tag, location } = this.props
    if (
      posts.state === FETCH_POSTS_ERROR ||
      cat.state === FETCH_CAT_INFO_ERROR ||
      tag.state === FETCH_TAG_INFO_ERROR)
      return (
        <ErrorContainer message='Problema durante il recupero dei posts' />
      )
    else {
      let title = ''
      if ( location.type === CATEGORY && cat.state === FETCH_CAT_INFO)
        title = 'Categoria ' + cat.name
      else if ( location.type === TAG && tag.state === FETCH_TAG_INFO)
        title = 'Tag ' + tag.name
      else if ( location.type === HOME )
        title = 'Ultimi posts inseriti'
      else
        title = ''

      return (
        <Visibility
          once={false}
          onBottomVisible={this.fetchPosts.bind(this)}
        >
          <Header as='h1' style={{ textAlign: 'center' }}>{title}</Header>
          <Grid id={'cards'} container stackable centered>
            {this.props.posts.list.length > 0 && this.renderCardsRows(this.props.posts.list)}
            <Grid.Row>
              <Label>
                {this.props.posts.page < this.props.posts.totalPages && (<Icon name='angle double down' />)}
                {this.props.posts.list.length}/{this.props.posts.total} Posts</Label>
              {posts.state === FETCHING_POSTS && <Loader active />}
            </Grid.Row>
          </Grid>
        </Visibility>
      )
    }
  }

  render() {
    return (
      this.getContent()
    )
  }
}

function mapStateToProps({ posts, cat, tag, location }) {
  return { posts, cat, tag, location };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts, dispatch }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CardsLoader)

function ErrorContainer({ message }) {
  return (
    <Container>
      <Header as='h1'>Errore</Header>
      {message}
    </Container>)
}