import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { get } from '../../../utils/apiCall'
import './emailVerify.styles.scss'

const EmailVerify = () => {
  const { id, secret } = useParams()
  const [res, setRes] = useState({})
  const history = useHistory()
  useEffect(() => {
    const sendData = async () => {
      const res = await get(`/api/verify-account/${id}/${secret}`)
      if (!res.ok) {
        history.push('/404')
      }
      const resJson = await res.json()
      setRes(resJson)
    }
    sendData()
  }, [id, secret, history])

  return (
    <div className='verify-email'>
      <div className='unicorn'></div>
      <div className='container'>
        <div className='warning'>
          <h2>{res.message}</h2>
          <p>Thank you for being part of our family.</p>
          <a href='/'>Go to Home Page</a>
        </div>
      </div>
    </div>
  )
}

export default EmailVerify
