import React from 'react'
import Togglable from '../components/Togglable'

const Blog = ({ blog, handleLike,handleDelet }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} name = "blog">
      <p className = 'base'>{blog.title} {blog.author}</p>
      <Togglable buttonLabel = 'view'>
        <div className = 'complex'>
          <p>{blog.url}</p>
          <p name = "likes">{blog.likes}<button onClick = {handleLike}>like</button></p>
          <p>{blog.users[0].username}</p>
          <button onClick = {handleDelet}>delete</button>
        </div>
      </Togglable>
    </div>
  )}

export default Blog
