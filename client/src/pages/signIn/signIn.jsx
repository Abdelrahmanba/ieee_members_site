import "./signIn.styles.scss"
import { useState } from "react"
import { signIn, signOut } from "../../redux/userSlice.js"
import { useDispatch } from "react-redux"
import { LoadingOutlined } from "@ant-design/icons"

import { Alert, Spin } from "antd"

import Textfield from "../../components/textfield/textfield"
import Button from "../../components/button/button"
import Form from "../../components/form/form"
import PublicHeader from "../../components/header/publicHeader"

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const SignIn = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    props.location.state = undefined
    setLoading(true)
    const res = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    const jsonRes = await res.json()
    if (jsonRes.token) {
      dispatch(signIn(jsonRes))
      setEmail(undefined)
    } else {
      setError(jsonRes)
    }
    setLoading(false)
  }

  return (
    <>
      <PublicHeader />
      <section className="sign-in">
        <div className="signin-box">
          <Spin indicator={spinIcon} spinning={loading}>
            <Form method="POST">
              <h1 className="signin-header">Sign In</h1>
              <p className="sign-in=paragraph"></p>
              <Textfield
                onChange={handleChange}
                type="text"
                name="email"
                text="Email Address"
                value={email}
              />
              <Textfield
                onChange={handleChange}
                type="password"
                name="password"
                text="Password"
                value={password}
              />
              <Button onClick={submit} text="Sign In" />
              {error ? (
                <Alert
                  message="Login Faild"
                  description={error.message}
                  type="error"
                  showIcon
                  className={"alert"}
                />
              ) : (
                ""
              )}
              {props.location.state ? (
                <Alert
                  message="Sign In Required"
                  description="Please Sign In to view this page."
                  type="info"
                  showIcon
                  className="alert"
                />
              ) : (
                ""
              )}
            </Form>
          </Spin>
        </div>
      </section>
    </>
  )
}

export default SignIn
