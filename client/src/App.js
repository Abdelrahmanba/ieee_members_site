import "./App.css"
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"

import "antd/dist/antd.css"
import HomePage from "./pages/homePage/home"
import SignIn from "./pages/signIn/signIn"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path={"/signin"} component={SignIn} />
      </Switch>
    </Router>
  )
}

export default App
