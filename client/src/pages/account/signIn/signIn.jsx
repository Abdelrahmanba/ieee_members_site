import { ReactComponent as Particels } from '../../../assets/icons/paricles.svg'

import './signIn.styles.scss'

import { useState } from 'react'
import { signIn } from '../../../redux/userSlice.js'
import { useDispatch } from 'react-redux'
import { Button, Alert } from 'antd'
import Textfield from '../../../components/textfield/textfield'
import Form from '../../../components/form/form'
import ResetPassword from '../../../components/resetPassword/resetPassword'
import Particle from '../../../components/particles/particles'
import { post } from '../../../utils/apiCall'

const SignIn = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const dispatch = useDispatch()

  const submit = async (e) => {
    e.preventDefault()
    props.location.state = undefined
    setLoading(true)
    const res = await post('/users/login', undefined, { email, password })
    const jsonRes = await res.json()
    if (jsonRes.token) {
      dispatch(signIn(jsonRes))
      if (jsonRes.user.activeEmail === false || jsonRes.user.activeCommttiee === false) {
        props.history.push('/Member/CompleteProfile')
      } else if (jsonRes.user.role === 'user') {
        props.history.push('/Member/Home')
      } else if (jsonRes.user.role === 'committee' || jsonRes.user.role === 'admin') {
        props.history.push('/Admin/Home')
      }
    } else {
      setLoading(false)
      setError(jsonRes)
    }
  }

  const onChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }
  return (
    <>
      <ResetPassword visible={modalVisible} setModalVisible={setModalVisible} />
      <Particle />
      <section className='sign-in'>
        <div className='signin-box'>
          <div className='box-header'>
            <Particels className='Particels' />
          </div>
          <Form onSubmit={submit}>
            <h1 className='signin-header'>Welcome Back</h1>
            <Textfield
              type='text'
              name='email'
              text='Email Address'
              value={email}
              autocomplete='email'
              onChange={onChange}
            />
            <Textfield
              type='password'
              name='password'
              text='Password'
              value={password}
              autocomplete='current-password'
              onChange={onChange}
            />
            <Button block type='primary' htmlType='submit' loading={loading}>
              Sign In
            </Button>
            {error && (
              <Alert
                message='Login Failed'
                description={error.message}
                type='error'
                showIcon
                className={'alert'}
              />
            )}
            {props.location.state && (
              <Alert
                message='Sign In Required'
                description='Please Sign In to view this page.'
                type='info'
                showIcon
                className='alert'
              />
            )}
            <p className='forgot-password' onClick={() => setModalVisible(true)}>
              Forgot your password?
            </p>
          </Form>
        </div>
      </section>
    </>
  )
}
export default SignIn
