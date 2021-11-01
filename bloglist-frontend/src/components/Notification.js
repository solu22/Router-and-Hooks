import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)
  if((message === null))
  {
    return null
  }
  return (
    <div>
      <p className= {message.type === 'success' ? 'success': 'error'}>{message.content}</p>
    </div>
  )
}

export default Notification
