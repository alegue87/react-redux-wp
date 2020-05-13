import React from 'react';
import { Card } from 'semantic-ui-react';
import PostCard from './../../components/main/PostCard';
import { connect } from 'react-redux';

class PostsCard extends React.Component{
  render() {
    return (
      <Card.Group>
        {this.props.posts.list && this.props.posts.list.map(
          (post) => {
            return (<PostCard key={post.id} post={post}/>)
          })
        }
      </Card.Group>
    )
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps, null)(PostsCard)