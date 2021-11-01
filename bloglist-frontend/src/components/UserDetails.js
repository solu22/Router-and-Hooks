import React from 'react'


const UserDetails = ({ user }) => {

  if(user){
    return (
      <div>
        <h2>{user.username}</h2>
        <h3>added blogs</h3>
        <div>
          {user.blogs.map(blog => (
            <li key = {blog.id}>{blog.title}</li>
          ))}
        </div>

      </div>
    )
  }
  return null
}

export default UserDetails
