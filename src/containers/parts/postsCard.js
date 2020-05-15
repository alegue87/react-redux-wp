import React from 'react';
import { Transition, Card, List, Grid } from 'semantic-ui-react';
import PostCard from './../../components/main/PostCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchPosts, TAG, CATEGORY, HOME, FETCH_POSTS, FETCH_CAT_INFO, FETCH_TAG_INFO } from '../../actions'

class PostsCard extends React.Component {
  constructor(props) {
    super(props)
    this.perPage = 4
    this.locationPathname = ''
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
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', (e) => {
      this.fetchPosts.bind(this)();
    })
    this.locationPathname = this.props.location.pathname
    this.fetchPosts();
  }

  componentDidUpdate() {
    if (this.locationPathname !== this.props.location.pathname) {
      if (this.props.posts.list.length > 0)
        this.props.resetPosts()
      //window.scrollTo({top:0, behavior:'smooth'})
      window.scrollTo({ top: document.getElementById('cards').offsetTop })
      if (this.props.page === HOME || this.props.page === FETCH_CAT_INFO || this.props.page === FETCH_TAG_INFO) {
        this.locationPathname = this.props.location.pathname
        this.fetchPosts()  // Carica primi posts

      }
    }
  }
  renderCardsRows(posts) {
    const forColumn = this.perPage
    let rows = [];
    for (let i = 0; i < posts.length; i += forColumn) {
      let cols = []
      for (let k = i; k < i + forColumn; k++) {
        let card;
        if(k<posts.length){
          card = <PostCard style={{height:'100%'}} key={posts[k].id} post={posts[k]} />
        }
        else{
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
      <Grid container stackable centered>
        {this.props.posts.list.length > 0 && this.renderCardsRows(this.props.posts.list)}
      </Grid>
    )
  }
}

function mapStateToProps({ posts, location, cat, tag, page }) {
  return { posts, location, cat, tag, page };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts, resetPosts }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsCard)

function resetPosts(dispatch) {
  return (dispatch) => {
    dispatch({
      type: FETCH_POSTS,
      payload: {
        list: [],
        totalPages: 1,
        total: 0,
        page: 0
      }
    });
  }
}