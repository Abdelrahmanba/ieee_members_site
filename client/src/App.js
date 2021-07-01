import { Switch, BrowserRouter as Router, Route } from "react-router-dom"

import { Provider } from "react-redux"
import store from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

import HomePage from "./pages/homePage/home"
import SignIn from "./pages/signIn/signIn"
import SignUp from "./pages/SignUp/SignUp"

import NotFound from "./pages/NotFound/notFound"
import Settings from "./pages/settings/settings"
import ProtectedRoute from "./protectedRoute"
import UserHome from "./pages/userHome/userHome"
import SignOut from "./pages/signOut/signOut"
import Profile from "./pages/profile/profile"
import Members from "./pages/members/members"
import CompleteProfile from "./pages/CompleteProfile/CompleteProfile"
import EmailVerify from "./pages/emailVerify/emailVerify"
import AOS from "aos"
import { useEffect } from "react"
import "aos/dist/aos.css"
import Event from "./pages/event/event"
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
            <Route path="/" exact component={HomePage} />

            <ProtectedRoute
              exact
              path={["/Member/Home", "/Member"]}
              component={UserHome}
            />
            <ProtectedRoute exact path="/Member/events" component={UserHome} />
            <ProtectedRoute exact path="/Member/members" component={Members} />
            <ProtectedRoute
              exact
              path="/Member/settings"
              component={Settings}
            />
            <ProtectedRoute
              exact
              path="/Member/profile/:id?"
              component={Profile}
            />
            <ProtectedRoute
              exact
              path="/Member/CompleteProfile"
              component={CompleteProfile}
            />
            <Route
              path="/api/verify-account/:id/:secret"
              component={EmailVerify}
            />

            <Route path="/user" component={HomePage} />
            <Route path="/admin" component={HomePage} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signout" component={SignOut} />
            <Route path="/Event/:id?" component={Event} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
