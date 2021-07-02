import './nonmembersModal.styles.scss'
import Form from '../../components/form/form'
import TextField from '../../components/textfield/textfield'
import ReCAPTCHA from 'react-google-recaptcha'
import { Modal, Alert } from 'antd'
import { useState } from 'react'

const NonMembersModel = ({ title, setVisible, visible, eventId }) => {
  const [capatcha, setCapatcha] = useState(false)
  const [alert, setAlert] = useState({ shown: false, type: 'error' })
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [year, setYear] = useState('')
  const [phone, setPhone] = useState('')

  const handleOk = async () => {
    setConfirmLoading(true)
    if (capatcha === false) {
      setAlert({
        shown: visible,
        type: 'error',
        title: 'Captcha Required',
        message: 'Please complete captcha challange.',
      })
      setConfirmLoading(false)

      return
    }
    const res = await fetch(process.env.REACT_APP_API_URL + '/event/add_nonMembers/' + eventId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, year }),
    })
    const resJson = await res.json()

    if (!res.ok) {
      setAlert({ shown: visible, type: 'error', title: resJson.error, message: resJson.message })
    } else {
      setAlert({ shown: visible, type: 'success', title: resJson.title, message: resJson.message })
    }
    setConfirmLoading(false)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'name': {
        setName(e.target.value)
        break
      }
      case 'email': {
        setEmail(e.target.value)
        break
      }
      case 'year': {
        setYear(e.target.value)
        break
      }
      case 'phone': {
        setPhone(e.target.value)
        break
      }
      default: {
        return
      }
    }
  }
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText='Submit'
      okButtonProps={{ disabled: alert.type === 'success' ? true : false }}
    >
      <Form>
        <p className='model-paragraph'>
          Please Fill this form to Join this event, we will contact you with farther Information.
        </p>
        <TextField name='name' text='Full Name' autocomplete='name' onChange={handleChange} />
        <TextField name='email' text='Email' autocomplete='email' onChange={handleChange} />
        <TextField name='year' text='Acadmic Year' type='' onChange={handleChange} />
        <TextField name='phone' text='Phone Number' autocomplete='tel' onChange={handleChange} />
        <ReCAPTCHA
          sitekey='6Le-VmsbAAAAAK1ZKClmYZ3XmACFEWe__itWUDQK'
          className='ReCAPTCHA'
          onChange={() => setCapatcha(true)}
        />
        {alert.shown && (
          <Alert
            message={alert.title}
            description={alert.message}
            type={alert.type}
            showIcon
            style={{ width: '90%' }}
          />
        )}
      </Form>
    </Modal>
  )
}

export default NonMembersModel
