import './settingsField.styles.scss'
import { EditOutlined } from '@ant-design/icons'
import { Button, Input, message, DatePicker, Radio } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/userSlice'

const SettingsField = ({ title, data, name, type }) => {
  const [fieldData, setFieldData] = useState(data)
  const [currentPassword, setCurrentPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()

  const token = useSelector((state) => state.user.token)

  const update = async (e) => {
    setLoading(true)
    const updateData = {}
    updateData[name] = fieldData
    if (type === 'password') {
      updateData['currentPassword'] = currentPassword
    }
    const res = await fetch(process.env.REACT_APP_API_URL + '/users/update', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(updateData),
    })
    const key = 'update'
    if (res.ok) {
      const jsonRes = await res.json()
      dispatch(setUser(jsonRes))
      message.success({
        content: `${title} was updated Sucsessfully`,
        key,
        duration: 4,
      })
    } else {
      message.error({ content: 'Somthing went worng :(', key, duration: 4 })
    }

    setLoading(false)
    setEdit(false)
  }
  return (
    <div className='body__section__outline'>
      <h3>{title}</h3>
      {(type === 'text' || type === 'number') && edit && (
        <Input
          value={fieldData}
          style={{ width: '100%' }}
          onChange={(e) => setFieldData(e.target.value)}
          type={type}
        />
      )}
      {type === 'date' && edit && (
        <DatePicker
          style={{ width: '60%' }}
          inputReadOnly
          onChange={(date, dateString) => {
            setFieldData(dateString)
          }}
        />
      )}
      {type === 'radio' && edit && (
        <Radio.Group defaultValue={data} onChange={(e) => setFieldData(e.target.value)}>
          <Radio.Button value='m'>Male</Radio.Button>
          <Radio.Button value='f'>Female</Radio.Button>
        </Radio.Group>
      )}
      {type === 'password' && edit && (
        <>
          <p className='password-title'>Current Password</p>
          <Input
            type='password'
            value={currentPassword}
            style={{ width: '100%' }}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <p className='password-title'>New Password</p>
          <Input
            type='password'
            value={fieldData}
            style={{ width: '100%' }}
            onChange={(e) => setFieldData(e.target.value)}
          />
        </>
      )}

      {edit ? (
        <div className='btn_box'>
          <Button loading={loading} type='primary' onClick={update}>
            Update
          </Button>
          <Button type='danger' onClick={() => setEdit(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <span className='data'>{data}</span>
          <Button type='primary' onClick={() => setEdit(true)} icon={<EditOutlined />} />
        </>
      )}
    </div>
  )
}

export default SettingsField
