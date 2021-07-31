import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOut } from '../../../redux/userSlice'
import { useEffect } from 'react'

const SignOut = () => {
  const dispatch = useDispatch()
  useEffect(() => dispatch(signOut()))
  return (
    <Redirect
      to={{
        pathname: '/',
      }}
    />
  )
}

export default SignOut
