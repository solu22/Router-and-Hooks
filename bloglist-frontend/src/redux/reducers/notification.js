const notificationReducer = (state = null, action) => {
  switch(action.type){
  case 'NOTIFY':
    return action.payload
  case 'MUTE_MESSAGE':
    return null

  default: return state
  }
}


const setNotification = (notification) => ({
  type:'NOTIFY',
  payload: notification
})

const clearNotification = () => ({
  type:'MUTE_MESSAGE'
})

export const notify = (message, type = 'success', second = 3, duration = 1000) => {
  return async dispatch => {
    await dispatch(setNotification({ message,type }))
    setTimeout(
      async() => await dispatch(clearNotification()), second*duration
    )
  }
}

export default notificationReducer