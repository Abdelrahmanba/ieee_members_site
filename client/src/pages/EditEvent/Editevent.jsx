import { InputNumber, message, Slider, Spin, DatePicker, Switch, Button, Breadcrumb } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import Textfield from '../../components/textfield/textfield'
import moment from 'moment'
import { Link } from 'react-router-dom'
const { RangePicker } = DatePicker

const EditEvent = () => {
  const history = useHistory()
  const token = useSelector((state) => state.user.token)
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [availableTickets, setAvailableTickets] = useState(50)
  const [date, setDate] = useState(null)
  const [nonMembers, setNonMembers] = useState(true)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    const fetchEventData = async () => {
      const eventData = await fetch(process.env.REACT_APP_API_URL + '/event/' + id)
      if (eventData.ok) {
        const event = await eventData.json()
        setTitle(event.title)
        setDuration(event.duration)
        setPrice(event.price)
        setLocation(event.location)
        setLink(event.link)
        setDescription(event.description)
        setAvailableTickets(event.availableTickets)
        setDate([new moment(event.startDate), new moment(event.endDate)])
        setNonMembers(event.allowNonMembers)
      } else {
        message.error('Something Went Worng')
      }
      setLoading(false)
    }
    fetchEventData()
  }, [])

  const HandleUpdate = async () => {
    if (title === 'null') {
      message.error('Please Provide Title.')
      return
    }
    if (date === null) {
      message.error('Please Provide Dates.')
      return
    }

    setConfirmLoading(true)

    const res = await fetch(process.env.REACT_APP_API_URL + '/event/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        title,
        duration,
        price,
        location,
        link,
        description,
        availableTickets,
        allowNonMembers: nonMembers,
        startDate: date[0].toDate(),
        endDate: date[1].toDate(),
      }),
    })
    if (res.ok) {
      history.push('/Admin/Events')
    } else {
      message.error('Something went wrong.')
    }

    setConfirmLoading(false)
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
            <label>Allow Non Members to Register</label>
            <Switch
              onChange={(e) => {
                setNonMembers(e)
              }}
              checked={nonMembers}
            />
          </div>
          <Button block type='primary' onClick={HandleUpdate} loading={confirmLoading}>
            Save Changes
          </Button>
        </div>
      </Spin>
    </>
  )
}

export default EditEvent
