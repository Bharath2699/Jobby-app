import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import ProtectiveRoute from './components/ProtectiveRoute'
import JobItemDetails from './components/JobItemDetails'
import Login from './components/Login'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectiveRoute exact path="/" component={Home} />
    <ProtectiveRoute exact path="/jobs" component={Jobs} />
    <ProtectiveRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
