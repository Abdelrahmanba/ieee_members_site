import './signup.styles.scss'
import Particle from '../../../components/particles/particles'
import { useState } from 'react'
import { Button, Alert } from 'antd'
import Textfield from '../../../components/textfield/textfield'
import Form from '../../../components/form/form'
import { ReactComponent as Particels } from '../../../assets/icons/paricles.svg'
import { useDispatch } from 'react-redux'
import { signIn } from '../../../redux/userSlice'
import { post } from '../../../utils/apiCall'
import ReCAPTCHA from 'react-google-recaptcha'

const SignUp = (props) => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [capatcha, setCapatcha] = useState(false)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'firstName') {
      setFirstName(e.target.value)
    } else if (e.target.name === 'lastName') {
      setLastName(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (capatcha === false) {
      setError({
        error: 'Captcha Required',
        message: 'Please complete captcha challange.',
      })
      return
    } else {
      setError(undefined)
    }
    setLoading(true)
    const res = await post('/users/', undefined, { firstName, lastName, email, password })
    const jsonRes = await res.json()
    if (res.ok) {
      setLoading(false)
      dispatch(signIn(jsonRes))
      props.history.push('/Member/CompleteProfile')
    } else {
      setLoading(false)
      setError(jsonRes)
    }
  }
  return (
    <>
      <Particle />
      <section className='sign-up'>
        <div className='signup-box'>
          <div className='box-header'>
            <Particels className='Particels' />
          </div>
          <Form method='POST'>
            <h1 className='signup-header'>Create Your Account</h1>
            <p>It takes less than a minute..</p>
            <Textfield
              onChange={handleChange}
              type='text'
              name='firstName'
              text='Fisrt Name'
              value={firstName}
              autocomplete='given-name'
            />
            <Textfield
              onChange={handleChange}
              type='text'
              name='lastName'
              text='Last Name'
              value={lastName}
              autocomplete='family-name'
            />
            <Textfield
              onChange={handleChange}
              type='text'
              name='email'
              text='Email Address'
              value={email}
              autocomplete='email'
            />
            <Textfield
              onChange={handleChange}
              type='password'
              name='password'
              text='Password'
              value={password}
              autocomplete='new-password'
            />
            <ReCAPTCHA
              sitekey='6Le-VmsbAAAAAK1ZKClmYZ3XmACFEWe__itWUDQK'
              className='ReCAPTCHA'
              onChange={() => setCapatcha(true)}
            />
            <Button block type='primary' loading={loading} onClick={submit}>
              Sign Up!
            </Button>
            {error && (
              <Alert
                message={error.error}
                description={error.message}
                type='error'
                showIcon
                className={'alert'}
              />
            )}
          </Form>
        </div>
      </section>
    </>
  )
}

export default SignUp
