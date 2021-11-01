import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../customhook'
import { createBlog } from '../redux/reducers/blog'
import { notify } from '../redux/reducers/notification'

const NewBlog = () => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (e) => {
    e.preventDefault()
    dispatch(
      createBlog({ title: title.value, author: author.value, url: url.value })
    )
    dispatch(notify(`a new blog ${title} by ${author}`))
  }

  return (
    <div className="formDiv">
      <h2>create new blog</h2>
      <form>
        <div>
          {' '}
          Title:
          <input {...title} />
        </div>
        <div>
          Author:
          <input {...author} />
        </div>
        <div>
          {' '}
          Url:
          <input {...url} />
        </div>

        <button id="save" type="submit" onClick={() => addBlog()}>
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
