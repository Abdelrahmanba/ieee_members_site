import "./App.css"
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"

import "antd/dist/antd.css"
import HomePage from "./pages/homePage/home"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
