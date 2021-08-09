import { Switch, BrowserRouter, Route } from 'react-router-dom'
import NotFound from '../pages/NotFound/notFound'
import HomePage from '../pages/homePage/home'
import PrivateFooter from '../components/footer/privateFooter'
//account
import SignIn from '../pages/account/signIn/signIn'
import SignUp from '../pages/account/signUp/signUp'
import SignOut from '../pages/account/signOut/signOut'
import EmailVerify from '../pages/account/emailVerify/emailVerify'
import ResetPassword from '../pages/account/passwordReset/resetPassword'
import CompleteProfile from '../pages/account/completeProfile/completeProfile'
//admin
import EventStatistics from '../pages/admin/eventStatistics/eventStatistics'
import AdminUsers from '../pages/admin/adminUsers/AdminUsers'
import AdminPoints from '../pages/admin/adminPoints/adminPoints'
import AdminHome from '../pages/admin/adminHome/adminHome'
import AdminEvents from '../pages/admin/adminEvents/adminEvents'
import EditEvent from '../pages/admin/editEvent/editevent'
import HeaderRouting from './header.router'
//member
import Settings from '../pages/member/settings/settings'
import MemberHome from '../pages/member/memberHome/memberHome'
import Profile from '../pages/member/profile/profile'
import Members from '../pages/member/members/members'
import Points from '../pages/member/points/points'
import Events from '../pages/member/events/events'
import ProtectedRoute from './protectedRoute'
import Event from '../pages/event/event'
import AllEvents from '../pages/event/allEvents'
import Announcemnt from '../components/member/announcement/announcement'

const Router = () => {
  return (
    <BrowserRouter>
      <HeaderRouting />
      <Switch>
        <Route path='/' exact component={HomePage} />

        <ProtectedRoute exact path={['/Member/Home', '/Member']} component={MemberHome} />
        <ProtectedRoute exact path='/Member/events' component={Events} />
        <ProtectedRoute exact path='/Member/members' component={Members} />
        <ProtectedRoute exact path='/Member/settings' component={Settings} />
        <ProtectedRoute exact path='/Member/profile/:id?' component={Profile} />
        <ProtectedRoute exact path='/Member/announcement/:id?' component={Announcemnt} />

        <ProtectedRoute exact path='/Member/Points' component={Points} />
        <ProtectedRoute exact path='/CompleteProfile' component={CompleteProfile} />

        <ProtectedRoute exact path={['/Admin/Home', '/Admin']} component={AdminHome} />
        <ProtectedRoute exact path={'/Admin/Events'} component={AdminEvents} />
        <ProtectedRoute exact path={'/Admin/EditEvent/:id'} component={EditEvent} />
        <ProtectedRoute exact path={'/Admin/Event/Statistics/:id'} component={EventStatistics} />
        <ProtectedRoute exact path={'/Admin/Users'} component={AdminUsers} />
        <ProtectedRoute exact path={'/Admin/Points'} component={AdminPoints} />

        <Route path='/api/verify-account/:id/:secret' component={EmailVerify} />
        <Route path='/api/reset-password/:id/:secret' component={ResetPassword} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signout' component={SignOut} />
        <Route exact path='/Event/:id?' component={Event} />
        <Route exact path='/ALLEvents/:type' component={AllEvents} />

        <Route path='*' component={NotFound} />
      </Switch>
      <Route path={['/member', '/admin', '/event', '/AllEvents/']} component={PrivateFooter} />
    </BrowserRouter>
  )
}

export default Router
