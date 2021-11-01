import React from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'
import { logout } from '../redux/reducers/user'
//import login from '../redux/reducers/user'

const Navigation = () => {
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to= "/blogs">Blogs</Button>
          <Button color="inherit" component= {Link} to = "/users">Users
          </Button>
          {user &&
            <div>
              <strong>{user.username} logged in
              </strong>
              <button onClick = {() => dispatch(logout())}>logout</button>
            </div>
          }

        </Toolbar>
      </AppBar>
    </Container>
  )
}

export default Navigation
