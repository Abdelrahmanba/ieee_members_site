import React from "react"
import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.user.token)
  // console.log(user)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...rest} {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: "/signIn",
                state: {
                  from: props.location,
                  redirected: true,
                },
              }}
            />
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
