import { Switch, BrowserRouter as Router, Route } from "react-router-dom"

import { Provider } from "react-redux"
import store from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

import HomePage from "./pages/homePage/home"
import SignIn from "./pages/signIn/signIn"
import PublicHeader from "./components/header/publicHeader"
import NotFound from "./pages/NotFound/notFound"
import Settings from "./pages/settings/settings"
import ProtectedRoute from "./protectedRoute"
import UserHome from "./pages/userHome/userHome"
import SignOut from "./pages/signOut/signOut"
import Profile from "./pages/profile/profile"

let persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <PublicHeader />
              <HomePage />
            </Route>
            <ProtectedRoute exact path="/dashboard" component={UserHome} />
            <ProtectedRoute exact path="/dashboard/Home" component={UserHome} />
            <ProtectedRoute
              exact
              path="/dashboard/events"
              component={UserHome}
            />
            <ProtectedRoute
              exact
              path="/dashboard/members"
              component={UserHome}
            />
            <ProtectedRoute
              exact
              path="/dashboard/settings"
              component={Settings}
            />
            <ProtectedRoute
              exact
              path="/dashboard/profile"
              component={Profile}
            />
            <Route path="/user" component={HomePage} />
            <Route path="/admin" component={HomePage} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signout" component={SignOut} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
