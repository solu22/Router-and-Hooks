import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Users from './components/Users'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import UserDetails from './components/UserDetails'
import { initUsers } from './redux/reducers/users'
import { initBlog } from './redux/reducers/blog'
import  BlogDetails  from './components/BlogDetails'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import { initUser } from './redux/reducers/user'

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const curr_user = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlog())
    dispatch(initUsers())
  }, [])

  const match = useRouteMatch('/users/:id')
  const matchedUser = match ? users.find(user => user.id === match.params.id):null

  return (
    <div>
      <Switch>

        <Route path="/blogs" exact>
          {curr_user === null ? (
            <div>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <Navigation />
              <Notification />
              <Blogs />
            </div>
          )}
        </Route>
        <Route path = '/blogs/:id'>
          {curr_user === null ? (
            <div>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <Navigation />
              <Notification />
              <BlogDetails />
            </div>
          )}

        </Route>
        <Route path="/users/:id">
          {curr_user === null ? (
            <div>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <Navigation />
              <h2>BlogList</h2>
              <Notification />
              <UserDetails user = {matchedUser} />
            </div>
          )}
        </Route>
        <Route path = '/users'>
          {curr_user === null ? (
            <div>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <Users  />
            </div>
          )}

        </Route>
        <Route path="/">
          <Notification />
          <LoginForm />
        </Route>
      </Switch>
    </div>
  )
}

export default App
