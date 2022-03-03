import {Switch, Route, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import userProfile from './components/UserProfileRoute'
import PageNotFound from './components/PageNotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/profile" component={MyProfile} />
    <ProtectedRoute
      exact
      path="/insta-share/users/:userId"
      component={userProfile}
    />

    <Route path="/bad-path" component={PageNotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
