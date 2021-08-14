import {
  InputNumber,
  message,
  Slider,
  Spin,
  DatePicker,
  Switch,
  Button,
  Select,
  Upload,
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import Textfield from '../../../components/textfield/textfield'
import moment from 'moment'
import { UploadOutlined } from '@ant-design/icons'
import { get, post } from '../../../utils/apiCall'
const { RangePicker } = DatePicker

const { Option } = Select
const EditEvent = () => {
  const history = useHistory()
  const token = useSelector((state) => state.user.token)
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [society, setSociety] = useState('wie')
  const [availableTickets, setAvailableTickets] = useState(50)
  const [date, setDate] = useState(null)
  const [nonMembers, setNonMembers] = useState(true)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [featured, setFeatured] = useState(undefined)
  const [imageList, setImageList] = useState([])

  useEffect(() => {
    const fetchEventData = async () => {
      const eventData = await get('/event/' + id)
      if (eventData.ok) {
        const event = await eventData.json()
        setTitle(event.title)
        setDuration(event.duration)
        setPrice(event.price)
        setLocation(event.location)
        setLink(event.link)
        setDescription(event.description)
        setAvailableTickets(event.availableTickets)
        setNonMembers(event.allowNonMembers)
        setSociety(event.society)
        if (event.featured) {
          setFeatured([
            {
              type: 'old',
              uid: event.featured.substring(0, event.featured.length - 5),
              thumbUrl: process.env.REACT_APP_API_URL + '/uploads/' + event.featured,
            },
          ])
        } else {
          setFeatured(undefined)
        }
        if (event.images) {
          setImageList(
            event.images.map((i) => ({
              type: 'old',
              uid: i.substring(0, i.length - 5),
              thumbUrl: process.env.REACT_APP_API_URL + '/uploads/' + i,
            }))
          )
        } else {
          setImageList(undefined)
        }
        setDate([new moment(event.startDate), new moment(event.endDate)])
      } else {
        message.error('Something Went Worng')
      }
      setLoading(false)
    }
    fetchEventData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdate = async () => {
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
      availableTickets,
      society,
      featured: featured,
      images: imageList,
      allowNonMembers: nonMembers,
      startDate: date[0].toDate(),
      endDate: date[1].toDate(),
    }
    if (featured.length && featured[0].type) {
      delete eventInfo.featured
    }
    if (imageList.length && imageList[0].type) {
      delete eventInfo.images
    }

    const res = await post('/event/update/' + id, token, eventInfo)
    if (res.ok) {
      history.push('/Admin/Events')
    } else {
      setConfirmLoading(false)
      message.error('Something went wrong.')
    }
  }
  const onFeaturedRemove = async (file) => {
    const res = await get('/event/deleteEventFeatured/' + id + '/' + file.uid, token)
    if (res.ok) {
      setFeatured(undefined)
    } else {
      return false
    }
  }
  const onRemove = async (file) => {
    const res = await get('/event/deleteEventImage/' + id + '/' + file.uid, token)
    if (res.ok) {
      setImageList((list) => list.filter((img) => img !== file.uid))
    } else {
      return false
    }
  }
  return (
    <>
      <Spin spinning={loading}>
        <div className='body'>
          <h1 className='title'>Edit Event</h1>
          <Textfield
            name='title'
            type='text'
            text='Title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Textfield
            name='duration'
            type='text'
            text='Duration'
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          />
          <Textfield
            name='price'
            type='text'
            text='Price'
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <Textfield
            name='location'
            type='text'
            text='Location'
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <Textfield
            name='link'
            type='text'
            text='Link'
            onChange={(e) => setLink(e.target.value)}
            value={link}
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
            {date && (
              <Upload
                action={process.env.REACT_APP_API_URL + '/event/uploadeImages'}
                listType='picture-card'
                className='upload-list-inline'
                maxCount='1'
                name='upload'
                accept='image/*'
                defaultFileList={featured}
                onRemove={onFeaturedRemove}
                headers={{
                  Authorization: 'Bearer ' + token,
                }}
                data={(file) => {
                  setFeatured('Featured' + file.uid)
                  return {
                    uid: 'Featured' + file.uid,
                  }
                }}
              >
                <Button type='link'>Upload</Button>
              </Upload>
            )}
          </div>
          <div className='form-row'>
            <label>Society</label>
            <Select value={society} style={{ width: '50%' }} onChange={(e) => setSociety(e)}>
              <Option value='wie'>Wie</Option>
              <Option value='computer'>Computer</Option>
              <Option value='pes'>PES</Option>
              <Option value='ras'>RAS</Option>
            </Select>
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
            <label className='optional'>Images Gallery</label>
            {date && (
              <Upload
                action={process.env.REACT_APP_API_URL + '/event/uploadeImages'}
                listType='picture-card'
                className='upload-list-inline'
                maxCount='5'
                name='upload'
                accept='image/*'
                defaultFileList={imageList}
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
                <Button type='link'>Upload</Button>
              </Upload>
            )}
          </div>

          <div className='form-row'>
            <label>Allow Non Members to Register</label>
            <Switch
              onChange={(e) => {
                setNonMembers(e)
              }}
              checked={nonMembers}
            />
          </div>

          <Button block type='primary' onClick={handleUpdate} loading={confirmLoading}>
            Save Changes
          </Button>
        </div>
      </Spin>
    </>
  )
}

export default EditEvent
