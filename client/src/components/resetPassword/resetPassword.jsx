import { Modal, Alert } from 'antd'
import { useState } from 'react'
import Textfield from '../textfield/textfield'
import './resetPassword.scss'

const ResetPassword = ({ visible, setModalVisible }) => {
  const [status, setStatus] = useState({})
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleOk = async () => {
    setConfirmLoading(true)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/reset_password/${email}`)
    if (res.ok) {
      setStatus({ status: 'sucsess' })
    } else {
      const json = await res.json()
      setStatus({ status: 'failed', error: json })
    }
    setConfirmLoading(false)
  }

  return (
    <Modal
      centered
      title='Reset Password'
      visible={visible}
      onCancel={() => setModalVisible(false)}
      okText='Reset My Password'
      onOk={handleOk}
      okButtonProps={status.status === 'sucsess' ? { disabled: true } : {}}
      confirmLoading={confirmLoading}
      closable={false}
    >
      <div className='modal'>
        <p>
          Please Enter Your Email below, we will send you instructions on how to reset your
          password, if you are facing any issues feel free to contact us.
        </p>
        <Textfield
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          text='Email Address'
        />
        {status.status === 'sucsess' ? (
          <Alert
            message='Success!'
            description={`An Email was sent to ${email} with farther information on how to reset your password.`}
            type='success'
            showIcon
          />
        ) : (
          ''
        )}
        {status.status === 'failed' ? (
          <Alert
            message={status.error.error}
            description={status.error.message}
            type='error'
            showIcon
            className={'alert'}
          />
        ) : (
          ''
        )}
      </div>
    </Modal>
  )
}

export default ResetPassword
