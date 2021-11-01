import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notification'
import blogReducer from './reducers/blog'
import authReducer from './reducers/user'
import  userReducer  from './reducers/users'

const reducers = combineReducers({
  notification:notificationReducer,
  blogs: blogReducer,
  auth: authReducer,
  users: userReducer,
})



const middleWare = [thunk]

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleWare))
)

export default store