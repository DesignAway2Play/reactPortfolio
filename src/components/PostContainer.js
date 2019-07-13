
import React, { Component } from 'react';
import Post from './Post';

const postContainerStyles = {
  maxWidth: 500,
  margin: '0 auto',
  padding: 20
}

class PostContainer extends Component {
  render() {
    let postList = this.props.posts.map(post => (
      <Post {...post} />
    ));

    return (
      <div 
        className="Post-container"
        style={ postContainerStyles }
      >
        { postList }  
      </div>
    );
  }
}

export default PostContainer;