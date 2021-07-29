// Router
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
// Pages
import HomePage from './pages/homePage/home'
import SignIn from './pages/signIn/signIn'
import SignUp from './pages/SignUp/SignUp'
import NotFound from './pages/NotFound/notFound'
import Settings from './pages/settings/settings'
import UserHome from './pages/userHome/userHome'
import SignOut from './pages/signOut/signOut'
import Profile from './pages/profile/profile'
import Members from './pages/members/members'
import CompleteProfile from './pages/CompleteProfile/CompleteProfile'
import EmailVerify from './pages/emailVerify/emailVerify'
import Event from './pages/event/event'
import Points from './pages/points/points'
import ResetPassword from './pages/passwordReset/resetPassword'
import AdminHome from './pages/adminHome/adminHome'
import AdminEvents from './pages/adminEvents/AdminEvents'
import EditEvent from './pages/EditEvent/Editevent'
//Headers
import AdminHeader from './components/header/adminHeader'
import UserHeader from './components/header/userHeader'
import PublicHeaderAlt from './components/header/publicHeaderAlt'
// AOS
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import PrivateFooter from './components/privateFooter/PrivateFooter'
import EventList from './pages/EventList/EventList'
import AdminUsers from './pages/adminUsers/AdminUsers'
import AdminPoints from './pages/adminPoints/adminPoints'
import Events from './pages/events/event'

let persistor = persistStore(store)

function App() {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route path={['/signin', '/signup']} exact component={PublicHeaderAlt} />
            <ProtectedRoute path='/Member' component={UserHeader} />
            <ProtectedRoute path='/Admin' component={AdminHeader} />
          </Switch>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <ProtectedRoute exact path={['/Member/Home', '/Member']} component={UserHome} />
            <ProtectedRoute exact path='/Member/events' component={Events} />
            <ProtectedRoute exact path='/Member/members' component={Members} />
            <ProtectedRoute exact path='/Member/settings' component={Settings} />
            <ProtectedRoute exact path='/Member/profile/:id?' component={Profile} />
            <ProtectedRoute exact path='/Member/Points' component={Points} />
            <ProtectedRoute exact path='/CompleteProfile' component={CompleteProfile} />

            <ProtectedRoute exact path={['/Admin/Home', '/Admin']} component={AdminHome} />
            <ProtectedRoute exact path={'/Admin/Events'} component={AdminEvents} />
            <ProtectedRoute exact path={'/Admin/EditEvent/:id'} component={EditEvent} />
            <ProtectedRoute exact path={'/Admin/Event/Statistics/:id'} component={EventList} />
            <ProtectedRoute exact path={'/Admin/Users'} component={AdminUsers} />
            <ProtectedRoute exact path={'/Admin/Points'} component={AdminPoints} />

            <Route path='/api/verify-account/:id/:secret' component={EmailVerify} />
            <Route path='/api/reset-password/:id/:secret' component={ResetPassword} />

            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signout' component={SignOut} />
            <Route path='/Event/:id?' component={Event} />

            <Route path='*' component={NotFound} />
          </Switch>
          <Route path={['/member', '/admin', '/event']} component={PrivateFooter} />
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
