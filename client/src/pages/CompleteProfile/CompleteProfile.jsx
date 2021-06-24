import { Result, Steps, Button, Alert, Typography } from "antd"
import PublicHeader from "../../components/header/publicHeader"
import PublicHeaderSections from "../../components/header/publicHeaderMenus/publicHeaderSections"
import Particle from "../../components/Particles/particles"
import "./completeProfile.styles.scss"
import {
  UnlockOutlined,
  MailOutlined,
  SolutionOutlined,
  LoadingOutlined,
} from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../redux/userSlice"
import { useHistory } from "react-router-dom"

const { Step } = Steps

const CompleteProfile = () => {
  const user = useSelector((state) => state.user)
  const [currentStep, setCurrentStep] = useState(1)
  const [loadingResend, setLoadingResend] = useState(false)
  const [loadingRefresh, setloadingRefresh] = useState(false)
  const [error, setError] = useState(false)
  const [succses, setSuccses] = useState(false)
  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    const load = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + "/user/me", {
        headers: new Headers({
          Authorization: "Bearer " + user.token,
        }),
      })
      const resJson = await res.json()
      if (res.ok) {
        dispatch(setUser(resJson))
        setCurrentStep(2)
        setloadingRefresh(false)
      }
      if (user.user.activeEmail === true) {
        setCurrentStep(2)
      }
      if (user.user.activeCommttiee === true) {
        history.push("/Member/Home")
      }
    }
    load()
  }, [user, dispatch, history])

  const refresh = async () => {
    setloadingRefresh(true)
    const res = await fetch(process.env.REACT_APP_API_URL + "/user/me", {
      headers: new Headers({
        Authorization: "Bearer " + user.token,
      }),
    })
    const resJson = await res.json()
    if (res.ok) {
      dispatch(setUser(resJson))
      setCurrentStep(2)
      setloadingRefresh(false)
    }
  }

  const resend = async () => {
    setLoadingResend(true)
    const res = await fetch(
      process.env.REACT_APP_API_URL +
        "/users/resend_verification/" +
        user.user._id
    )
    console.log(res)
    if (!res.ok) {
      setError(true)
      setSuccses(false)
    } else {
      setSuccses(true)
      setError(false)
    }

    setLoadingResend(false)
  }

  return (
    <>
      <PublicHeader>
        <PublicHeaderSections />
      </PublicHeader>
      <Particle />
      <div className="body complete_profile">
        <Steps responsive current={currentStep} className="steps">
          <Step
            status="finish"
            title="Register"
            icon={<SolutionOutlined style={{ color: "#0275a9" }} />}
          />
          {currentStep === 1 ? (
            <Step
              status="process"
              title="Email Verification"
              icon={<LoadingOutlined style={{ color: "#0275a9" }} />}
            />
          ) : (
            <Step
              status="finish"
              title="Email Verification"
              icon={<MailOutlined style={{ color: "#0275a9" }} />}
            />
          )}
          {currentStep === 2 ? (
            <Step
              status="process"
              title="Review"
              icon={<LoadingOutlined style={{ color: "#0275a9" }} />}
            />
          ) : (
            <Step
              status="wait"
              title="Review"
              icon={<UnlockOutlined style={{ color: "#0275a9" }} />}
            />
          )}
        </Steps>
        {currentStep === 1 && (
          <Result
            title={`Please check your Email (${user.user.email}) and follow the instructions sent to you.`}
            extra={
              <>
                <Button
                  type="primary"
                  loading={loadingRefresh}
                  onClick={refresh}
                >
                  Refresh
                </Button>
                <Button type="primary" loading={loadingResend} onClick={resend}>
                  Resend Email
                </Button>
                {error && (
                  <Alert
                    message="Error"
                    description="Something went wrong."
                    type="error"
                    showIcon
                    style={{
                      margin: "30px auto",
                      width: "80%",
                    }}
                  />
                )}
                {succses && (
                  <Alert
                    message="Email Was Sent"
                    description="An Email was sent to you, please check your mailbox"
                    type="success"
                    showIcon
                    style={{
                      margin: "30px auto",
                      width: "80%",
                    }}
                  />
                )}
              </>
            }
          />
        )}
        {currentStep === 2 && (
          <div style={{ marginBottom: "auto", textAlign: "center" }}>
            <h1 className="header-main">We Are Reviewing Your Account ..</h1>
            <Typography.Paragraph>
              This process may take up 24 hours, once completed you may access
              your account normally.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Thank You for being part of our family !
            </Typography.Paragraph>
          </div>
        )}
      </div>
    </>
  )
}

export default CompleteProfile
