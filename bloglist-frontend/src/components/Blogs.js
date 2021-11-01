import React from 'react'
import { useSelector } from 'react-redux'
import Toggalable from './Toggalable'
import NewBlog from './NewBlog'
import  Blog  from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.auth)

  if(user){

    return (
      <>
        <div>
          <Toggalable buttonlabel = 'new blog'>
            <NewBlog />
          </Toggalable>
        </div>
        <div>
          <h2>Contents</h2>
          {blogs.map((blog) => (
            <Blog key = {blog.id} blog = {blog} />
          ))}
        </div>
      </>
    )


  }
  return null
}

export default Blogs
