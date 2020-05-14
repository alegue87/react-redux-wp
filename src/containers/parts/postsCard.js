import React from 'react';
import { Card } from 'semantic-ui-react';
import PostCard from './../../components/main/PostCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchPosts, TAG, CATEGORY, FETCH_POSTS } from '../../actions'

class PostsCard extends React.Component {
  constructor(props) {
    super(props)
    this.props = {
      perPage: 3
    }
    this.pageNum = 0
    this.posts = []
  }

  fetchPosts() {
    let totalPages
    if (this.props.posts.totalPages === undefined) {
      totalPages = 1
    }
    else {
      totalPages = this.props.posts.totalPages;
    }
    let tax = {
      type: '',
      id: 0
    }
    if (this.pageNum < totalPages) {
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
      this.pageNum++
      this.props.fetchPosts({
        post_type: 'posts',
        per_page: this.props.perPage,
        page: this.pageNum,
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
      this.locationPathname = this.props.location.pathname
      this.posts = []
      this.pageNum = 0
      window.scrollTo({top:0, behavior:'smooth'})
    }
  }

  render() {
    if (this.props.page === FETCH_POSTS) {
      this.posts = this.posts.concat(this.props.posts.list)
    }
    return (
      <Card.Group centered>
        {this.posts.length > 0 && this.posts.map(
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
  return bindActionCreators({ fetchPosts }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsCard)