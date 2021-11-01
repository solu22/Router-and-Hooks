/* eslint-disable no-case-declarations */
import blogService from '../../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'BLOG_INIT':
    return action.data.sort((a,b) => b.likes-a.likes)
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'UPDATE':{
    const id = action.data.id
    const updatedBlog = state.find((b) => b.id === id)
    const newUpdate = {
      ...updatedBlog, likes: updatedBlog.likes +1
    }
    return state.map((a) => a.id !== id? a: newUpdate)
  }
  case 'REMOVE':
    return state.filter((r) => r.id!== action.id)

  case 'COMMENT':
    const updatedBlog = state.find(a => a.id === action.data.id)
    const changedBlog = {
      ...updatedBlog, comments: action.data.comments
    }
    return state.map((blog) => blog.id !== action.data.id ? blog: changedBlog)


  default:
    return state
  }

}

export const initBlog = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type:'BLOG_INIT',
      data,
    })
  }
}

export const createBlog = (blogObj) => {
  return async dispatch => {
    const data = await blogService.create(blogObj)
    dispatch({
      type: 'CREATE_BLOG',
      data
    })
  }
}

export const updateLike = (blogObj) => {
  return async dispatch => {
    const data = await blogService.update({ ...blogObj, likes: blogObj.likes + 1 })
    dispatch({
      type:'UPDATE',
      data
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type:'REMOVE',
      id
    })
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const data = await blogService.update({
      ...blog, comments: blog.comments.concat([comment])
    })
    dispatch({
      type: 'COMMENT',
      data
    })
  }
}

export default blogReducer