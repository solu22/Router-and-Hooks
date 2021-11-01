import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { deleteBlog, updateLike } from '../redux/reducers/blog'
import { notify } from '../redux/reducers/notification'
import { useParams } from 'react-router'
import { addComment } from '../redux/reducers/blog'

const BlogDetails = () => {
  const blogs = useSelector(state => state.blogs)
  const id  = useParams().id
  const matchBlog = blogs.find((mb) => mb.id === id)

  const dispatch = useDispatch()
  const like = (blog) => {
    dispatch(updateLike(blog))
    dispatch(notify(`Blog ${blog.title} updated`))
  }

  const remove = (blog) => {
    dispatch(deleteBlog(blog.id))
    dispatch(`Successfully deleted blog ${blog.title}`)
  }

  const comment = (event) => {
    event.preventDefault()
    const addcomment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment(matchBlog, addcomment))

  }

  if(!matchBlog) return null

  return (
    <>
      <div>
        <p>Title: {matchBlog.title}</p>
        <p> Url: {matchBlog.url}</p>
        <p>
          {matchBlog.likes}
          <button onClick={() => like(matchBlog)} id="like">like</button>
        </p>
        <p>Writted by: {matchBlog.user.username}</p>
        <button onClick= {() => remove(matchBlog)} id="remove">Remove</button>
      </div>
      <hr></hr>
      <div>
        <h2>comments</h2>
        <form onSubmit = {comment}>
          <div>
            <input type ="text" name ="comment" id="comment"/>
            <button type= "submit" >Comment</button>
          </div>
        </form>
        <li>
          {matchBlog.comments.map((comment,index) => (
            <div key = {index}>
              <li>{comment}</li>
            </div>
          ))}
        </li>
      </div>
    </>
  )
}


export default BlogDetails
