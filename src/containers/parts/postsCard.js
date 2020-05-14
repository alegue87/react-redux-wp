import React from 'react';
import { Card } from 'semantic-ui-react';
import PostCard from './../../components/main/PostCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchPosts, TAG, CATEGORY, HOME, FETCH_POSTS, FETCH_CAT_INFO, FETCH_TAG_INFO } from '../../actions'

class PostsCard extends React.Component {
  constructor(props) {
    super(props)
    this.perPage = 3
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
        page: this.props.posts.page+1,
        tax
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', (e) => {
      this.fetchPosts.bind(this)();
    })
    this.locationPathname = this.props.location.pathname
  }

  componentDidUpdate(){
    if (this.locationPathname !== this.props.location.pathname) {
      if(this.props.posts.list.length > 0)
        this.props.resetPosts()
      //window.scrollTo({top:0, behavior:'smooth'})
      window.scrollTo({top:document.getElementById('card').offsetTop})
      if(this.props.page === HOME || this.props.page === FETCH_CAT_INFO || this.props.page === FETCH_TAG_INFO ){
        this.locationPathname = this.props.location.pathname
        this.fetchPosts()  // Carica primi posts
        
      }
    }
  }

  render() {
    return (
      <Card.Group id={'card'} centered>
        {this.props.posts.list.length > 0 && this.props.posts.list.map(
          (post) => {
            return (<PostCard key={post.id} post={post} />)
          })
        }
      </Card.Group>
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

function resetPosts(dispatch){
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