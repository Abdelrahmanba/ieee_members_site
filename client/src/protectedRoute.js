import React from "react"
import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user)
  // console.log(user)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.token) {
          if (
            (user.user.activeEmail === false &&
              props.location.pathname !== "/Member/CompleteProfile") ||
            (user.user.activeCommttiee === false &&
              props.location.pathname !== "/Member/CompleteProfile")
          ) {
            return (
              <Redirect
                to={{
                  pathname: "/Member/CompleteProfile",
                  state: {
                    from: props.location,
                    redirected: true,
                  },
                }}
              />
            )
          } else {
            return <Component {...rest} {...props} />
          }
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
