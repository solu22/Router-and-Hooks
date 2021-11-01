import blogService from '../../services/blogs'
import loginService from '../../services/login'
import { notify } from './notification'

const authReducer = (state = null, action) => {
  switch(action.type){
  case 'INIT_USER':
    return action.user
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return action.user

  default:
    return state
  }
}

export const initUser = () => {
  const loggedBlogUserJSON = window.localStorage.getItem('loggedBlogUser')
  if (loggedBlogUserJSON) {
    const user = JSON.parse(loggedBlogUserJSON)
    blogService.setToken(user.token)
    return{
      type: 'INIT_USER',
      user:user
    }
  }
  return{
    type: 'INIT_USER',
    user:null
  }
}


export const login =  (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        user: user
      })
      dispatch(notify('Welcome'))
    } catch (error) {
      dispatch(notify('Wrong credentials', error,5))
    }
  }

}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch({
      type: 'LOGOUT',
      user: null

    })
  }
}


export default authReducer