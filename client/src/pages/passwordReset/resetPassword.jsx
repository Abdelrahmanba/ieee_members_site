import './resetPassword.styles.scss'
import Textfield from '../../components/textfield/textfield'
import { Alert, Button } from 'antd'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/userSlice'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ msg: '', desc: '', shown: false })
  const dispatch = useDispatch()
  const history = useHistory()

  const { id, secret } = useParams()

  const handleOk = async () => {
    setLoading(true)
    const res = await fetch(
      process.env.REACT_APP_API_URL + '/api/reset-password/' + id + '/' + secret,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      }
    )
    const jsonRes = await res.json()
    setLoading(false)

    if (res.ok) {
      setAlert({
        shown: true,
        desc: 'Password Was Reset Successfully!',
        msg: 'You will be redirected in 7s.',
        type: 'success',
      })
      dispatch(signIn(jsonRes))
      setTimeout(() => {
        if (jsonRes.user.activeEmail === false || jsonRes.user.activeCommttiee === false) {
          history.push('/Member/CompleteProfile')
        } else {
          history.push('/Member/Home')
        }
      }, 5000)
    } else {
      setAlert({
        shown: true,
        desc: 'Something Worng :(',
        msg: 'If you keep getting that error please contact us.',
        type: 'error',
      })
    }
  }
  return (
    <div className='reset-password'>
      <div className='body'>
        <h1>One More Step..</h1>
        <p> Please enter your new pasword..</p>
        <Textfield
          name='password'
          text='New Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          style={{ marginTop: 20, marginBottom: 20 }}
          type='primary'
          onClick={handleOk}
          loading={loading}
        >
          Change My Password
        </Button>
        {alert.shown && (
          <Alert showIcon description={alert.msg} message={alert.desc} type={alert.type} />
        )}
      </div>
    </div>
  )
}

export default ResetPassword
