import './addevent.styles.scss'
import {
  Modal,
  Slider,
  InputNumber,
  DatePicker,
  Button,
  Input,
  Select,
  Upload,
  Switch,
  message,
} from 'antd'
import { useState } from 'react'
import Textfield from '../../textfield/textfield'
import Form from '../../form/form'
import { UploadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { post, get } from '../../../utils/apiCall.js'
const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker

const AddEvent = ({ visible, setVisible, id }) => {
  const token = useSelector((state) => state.user.token)
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [featured, setFeatured] = useState(undefined)
  const [availableTickets, setAvailableTickets] = useState(50)
  const [date, setDate] = useState(null)
  const [society, setSociety] = useState('wie')
  const [nonMembers, setNonMembers] = useState(true)
  const [imageList, setImageList] = useState([])
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
    setConfirmLoading(true)
    const eventInfo = {
      title,
      duration,
      price,
      location,
      link,
      description,
      ...(featured && { featured }),
      availableTickets,
      society,
      allowNonMembers: nonMembers,
      images: imageList,
      startDate: date[0].toDate(),
      endDate: date[1].toDate(),
    }

    const res = await post('/event/', token, eventInfo)
    if (res.ok) {
      setVisible(false)
    } else {
      message.error('Something went wrong.')
    }
    setConfirmLoading(false)
  }

  const onFeaturedRemove = async (file) => {
    const res = await get('/event/deleteImage/Featured' + file.uid, token)
    if (res.ok) {
      setFeatured('')
    }
  }

  const onRemove = async (file) => {
    const res = await fetch('/event/deleteImage/' + file.uid, token)
    if (res.ok) {
      setImageList((list) => list.filter((img) => img !== file.uid))
    }
  }

  return (
    <>
      <Modal
        title='Add Event'
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
            text='Duration'
            name='duration'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <Textfield
            type='text'
            text='Price'
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Textfield
            type='text'
            text='Location'
            name='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
              listType='picture'
              className='upload-list-inline'
              maxCount='1'
              name='upload'
              accept='image/*'
              headers={{
                Authorization: 'Bearer ' + token,
              }}
              data={(file) => {
                setFeatured('Featured' + file.uid)
                return {
                  uid: 'Featured' + file.uid,
                }
              }}
              onRemove={onFeaturedRemove}
            >
              <Button className='upload' icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </div>
          <div className='form-row'>
            <label>Available Tickets</label>
            <Slider
              min={1}
              max={150}
              value={typeof availableTickets === 'number' ? availableTickets : 0}
              onChange={(v) => setAvailableTickets(v)}
              className='slider'
            />
            <InputNumber
              min={1}
              max={150}
              style={{ margin: '0 16px' }}
              value={availableTickets}
              onChange={(v) => setAvailableTickets(v)}
            />
          </div>
          <div className='form-row'>
            <label>Date And Time</label>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format='YYYY-MM-DD HH:mm'
              onChange={(v) => {
                setDate(v)
              }}
              value={date}
              allowEmpty={false}
              use12Hours
              inputReadOnly
            />
          </div>
          <div className='form-row'>
            <label>Society</label>
            <Select defaultValue={society} className='select' onChange={(e) => setSociety(e)}>
              <Option value='wie'>Wie</Option>
              <Option value='computer'>Computer</Option>
              <Option value='pes'>PES</Option>
              <Option value='ras'>RAS</Option>
            </Select>
          </div>
          <div className='form-row'>
            <label>Allow Non Members to Register</label>
            <Switch
              defaultChecked
              onChange={(e) => {
                setNonMembers(e)
              }}
            />
          </div>
          <div className='form-row'>
            <label className='optional'>Images Gallery</label>
            <Upload
              action={process.env.REACT_APP_API_URL + '/event/uploadeImages'}
              listType='picture'
              className='upload-list-inline'
              maxCount='5'
              name='upload'
              accept='image/*'
              onChange={({ file, fileList, e }) => {
                setImageList(
                  fileList
                    .filter((f) => f.status === 'done')
                    .map((f) => {
                      return f.originFileObj.uid
                    })
                )
              }}
              headers={{
                Authorization: 'Bearer ' + token,
              }}
              data={(file) => {
                setImageList((list) => list.concat(file.uid))
                return {
                  uid: file.uid,
                }
              }}
              onRemove={onRemove}
            >
              <Button className='upload' icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </div>

          <Button block type='primary' onClick={handleAdd}>
            Add Event
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default AddEvent
