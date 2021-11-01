import React from 'react'

import { useDispatch } from 'react-redux'
import { useField } from '../customhook'
import { login } from '../redux/reducers/user'
import { useHistory } from 'react-router-dom'


const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPass, ...password } = useField('password')

  const resetField = () => {
    resetUsername()
    resetPass()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username.value, password.value))
    resetField()
    history.push('/blogs')
  }

  return (
    <div>
      <h2>Login to App
      </h2>
      <form>
          username:{' '}
        <input {...username}/>
          password:{' '}
        <input {...password}/>
        <button id="login" type="submit" onClick = {handleLogin}>
            Login
        </button>
      </form>
    </div>
  )

}


export default LoginForm
