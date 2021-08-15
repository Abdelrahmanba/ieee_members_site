import { Modal, DatePicker, Button, Input, Upload, message } from 'antd'
import { useState } from 'react'
import Textfield from '../../textfield/textfield'
import Form from '../../form/form'
import { useSelector } from 'react-redux'
import { post, get } from '../../../utils/apiCall.js'
const { TextArea } = Input

const AddAnnouncement = ({ visible, setVisible }) => {
  const token = useSelector((state) => state.user.token)
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [featured, setFeatured] = useState(undefined)
  const [date, setDate] = useState(null)
  const [deadline, setDeadline] = useState(null)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleAdd = async () => {
    if (title === 'null') {
      message.error('Please Provide Title.')
      return
    }
    if (date === null) {
      message.error('Please Provide Dates.')
      return
    }
    if (featured === undefined) {
      message.error('Please Provide Featured Image.')
      return
    }
    setConfirmLoading(true)
    const eventInfo = {
      title,
      ...(link && { link }),
      description,
      ...(featured && { featured }),
      date: date.toDate(),
      ...(deadline && { deadline: deadline.toDate() }),
    }
    const res = await post('/announcement/', token, eventInfo)
    if (res.ok) {
      setVisible(false)
    } else {
      message.error('Something went wrong.')
    }
    setConfirmLoading(false)
  }

  const onFeaturedRemove = async (file) => {
    const res = await get('/announcement/deleteImage' + file.uid, token)
    if (res.ok) {
      setFeatured('')
    }
  }

  return (
    <>
      <Modal
        title='Add Announcement'
        visible={visible}
        confirmLoading={confirmLoading}
        className='add-event'
        width='80vw'
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form type='POST'>
          <Textfield
            type='text'
            text='Title'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textfield
            type='text'
            text='Link'
            name='link'
            placeholder='Optional'
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <TextArea
            rows={4}
            className='text-area'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className='form-row'>
            <label>Featured Image</label>
            <Upload
              action={process.env.REACT_APP_API_URL + '/event/uploadeImages'}
              listType='picture-card'
              className='upload-list-inline'
              maxCount='1'
              name='upload'
              accept='image/*'
              headers={{
                Authorization: 'Bearer ' + token,
              }}
              data={(file) => {
                setFeatured('Announcement' + file.uid)
                return {
                  uid: 'Announcement' + file.uid,
                }
              }}
              onRemove={onFeaturedRemove}
            >
              <Button type='link'>Upload</Button>
            </Upload>
          </div>
          <div className='form-row'>
            <label>Date</label>
            <DatePicker
              format='YYYY-MM-DD'
              onChange={(v) => {
                setDate(v)
              }}
              value={date}
              allowEmpty={false}
              inputReadOnly
            />
          </div>
          <div className='form-row'>
            <label className='optional'>Deadline</label>
            <DatePicker
              format='YYYY-MM-DD'
              onChange={(v) => {
                setDeadline(v)
              }}
              value={deadline}
              allowEmpty={false}
              inputReadOnly
            />
          </div>
          <Button block type='primary' onClick={handleAdd}>
            Add Announcement
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default AddAnnouncement
