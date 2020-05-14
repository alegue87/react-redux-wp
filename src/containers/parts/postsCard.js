import React from 'react';
import { Card } from 'semantic-ui-react';
import PostCard from './../../components/main/PostCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchPosts } from '../../actions'

class PostsCard extends React.Component{
  constructor(props){
    super(props)
    this.props = {perPage: 3}
    this.pageNum = 0
    this.posts = []
    window.addEventListener('scroll', (e) => {
      this.fetchPosts.bind(this)();
    })
  }

  fetchPosts(){
    let totalPages
    if(this.props.posts.totalPages === undefined){
      totalPages = 1
    }
    else{
      totalPages = this.props.posts.totalPages;
    }
    if(this.pageNum < totalPages){
      this.pageNum++
      this.props.fetchPosts({
        post_type: 'posts',
        per_page: this.props.perPage,
        page: this.pageNum
      }) 
    }    
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.location.type !== this.props.location.type){
      this.posts = []
      this.pageNum = 0
      alert('location changed')
    }
    return true
  }

  render() { 
    if(this.props.posts.list)
      this.posts = this.posts.concat(this.props.posts.list)  
    return (
      <Card.Group centered>
        {this.posts.length > 0 && this.posts.map(
          (post) => {
            return (<PostCard key={post.id} post={post}/>)
          })
        }
      </Card.Group>
    )
  }
}

function mapStateToProps({ posts, location }) {
  return { posts, location };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchPosts}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsCard)