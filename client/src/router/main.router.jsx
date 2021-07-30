import { Switch, BrowserRouter, Route } from 'react-router-dom'
import NotFound from '../pages/NotFound/notFound'
import HomePage from '../pages/homePage/home'
import PrivateFooter from '../components/privateFooter/PrivateFooter'
//account
import SignIn from '../pages/signIn/signIn'
import SignUp from '../pages/SignUp/SignUp'
import SignOut from '../pages/signOut/signOut'
import EmailVerify from '../pages/emailVerify/emailVerify'
import ResetPassword from '../pages/passwordReset/resetPassword'
//admin
import EventList from '../pages/EventList/EventList'
import AdminUsers from '../pages/adminUsers/AdminUsers'
import AdminPoints from '../pages/adminPoints/adminPoints'
import AdminHome from '../pages/adminHome/adminHome'
import AdminEvents from '../pages/adminEvents/AdminEvents'
import EditEvent from '../pages/EditEvent/Editevent'
import HeaderRouting from './header.router'
//member
import Settings from '../pages/settings/settings'
import UserHome from '../pages/userHome/userHome'
import Profile from '../pages/profile/profile'
import Members from '../pages/members/members'
import CompleteProfile from '../pages/CompleteProfile/CompleteProfile'
import Points from '../pages/points/points'
import Events from '../pages/events/event'
import ProtectedRoute from './protectedRoute'

const Router = () => {
  return (
    <BrowserRouter>
      <HeaderRouting />
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

        <Route exact path='/Event/:id?' component={Event} />
        <Route path='*' component={NotFound} />
      </Switch>
      <Route path={['/member', '/admin', '/event']} component={PrivateFooter} />
    </BrowserRouter>
  )
}

export default Router
