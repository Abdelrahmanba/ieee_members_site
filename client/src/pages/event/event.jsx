import { useSelector } from 'react-redux'
import './event.styles.scss'
import PublicHeader from '../../components/header/publicHeader'
import Header from '../../components/header/emptyHeader'
import UserHeaderSections from '../../components/header/userMenus/userMenuSections'
import { Button, Image } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import UserCard from '../../components/userCard/userCard'
import NonMembersModel from '../../components/nonmembersEventModal/NonMembersModal'

import {
  CalendarOutlined,
  LinkOutlined,
  ClockCircleOutlined,
  ScheduleOutlined,
  CompassOutlined,
  TeamOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons'

const Event = () => {
  const user = useSelector((state) => state.user)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { id } = useParams()
  const [event, setEvent] = useState({})
  const [seats, setSeats] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await fetch(process.env.REACT_APP_API_URL + '/event/' + id)
      if (event.ok) {
        const resJson = await event.json()
        setEvent(resJson)
        setSeats(resJson.availableTickets - resJson.participants.length)
      }
    }
    fetchEvent()
  }, [])

  const joinHandle = async () => {
    setConfirmLoading(true)
    const res = await fetch(
      process.env.REACT_APP_API_URL + '/event/add_participants/' + event._id,
      {
        headers: new Headers({
          Authorization: 'Bearer ' + user.token,
        }),
      }
    )
    const resJson = await res.json()

    if (!res.ok) {
      return
    } else {
      setEvent((event) => ({
        ...event,
        participants: resJson,
      }))
    }
    setSeats((seats) => seats - 1)
    setConfirmLoading(false)
  }
  const removeHandle = async () => {
    setConfirmLoading(true)
    const res = await fetch(
      process.env.REACT_APP_API_URL + '/event/remove_participants/' + event._id,
      {
        headers: new Headers({
          Authorization: 'Bearer ' + user.token,
        }),
      }
    )
    const resJson = await res.json()

    if (!res.ok) {
      return
    } else {
      setEvent((event) => ({
        ...event,
        participants: resJson,
      }))
    }
    setSeats((seats) => seats + 1)
    setConfirmLoading(false)
  }

  return (
    <>
      {user.token ? (
        <Header>
          <UserHeaderSections />
        </Header>
      ) : (
        <PublicHeader />
      )}
      <div className='body event'>
        <NonMembersModel
          title={event.title}
          setVisible={setVisible}
          visible={visible}
          eventId={event._id}
        />
        <div className='container-event'>
          <h1 className='header-text'>
            <span className='highlight-container'>
              <span className='highlight highlight-1 noselect'>{event && event.title}</span>
            </span>
          </h1>
          <img
            alt=''
            src='https://branch.ieee-annu.com/wp-content/uploads/2021/04/174199218_3947661548612760_4824108478649130793_n.jpg'
            className='image'
          />
          <div className='event__box'>
            <div className='event-box-body'>
              <h2 className='event-title'>Event Details</h2>
              <div className='event-box-row'>
                <div className='label'>
                  <CalendarOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
                  Start Date
                </div>
                {event && new Date(event.startDate).toDateString()}
              </div>
              <div className='event-box-row'>
                <div className='label'>
                  <ClockCircleOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
                  Start Time
                </div>
                {event && new Date(event.startDate).toLocaleTimeString([], { timeStyle: 'short' })}
              </div>
              <div className='event-box-row'>
                <div className='label'>
                  <ScheduleOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
                  Duration
                </div>
                {event && event.duration}
              </div>
              <div className='event-box-row'>
                <div className='label'>
                  <CompassOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
                  Location
                </div>
                {event && event.location}
              </div>
              <div className='event-box-row'>
                <div className='label'>
                  <TeamOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
                  Attendence
                </div>
                {event && event.availableTickets}
              </div>
              <div className='event-box-row'>
                <div className='label'>
                  <DollarCircleOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
                  Price
                </div>
                {event && event.price === 0 ? 'Free' : event.price + '₪'}
              </div>
              {event && event.link && (
                <div className='event-box-row'>
                  <div className='label'>
                    <LinkOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
                    Link
                  </div>
                  {<a href={'http://' + event.link}>Click Here</a>}
                </div>
              )}
            </div>
          </div>
        </div>
        {event.orginizers && event.orginizers.length > 0 && (
          <div className='orgnizers'>
            <h2 className='header-text'>
              <span className='highlight-container sub'>
                <span className='highlight highlight-2 noselect'>Organizers </span>
              </span>
            </h2>

            {event.orginizers.map((user, index) => (
              <UserCard
                key={index}
                name={user.firstName + ' ' + user.lastName}
                position={user.position}
                points={user.points}
                avatar={user.imageData}
                id={user._id}
              />
            ))}
          </div>
        )}
        {event && event.images && event.images.length > 0 && (
          <div className='preview'>
            <h2 className='header-text'>
              <span className='highlight-container sub'>
                <span className='highlight highlight-2 noselect'>Event Gallery</span>
              </span>
            </h2>
            <Image.PreviewGroup style={{ width: '100%' }}>
              {event.images.map((src, index) => (
                <Image key={index} width={200} src={src} />
              ))}
            </Image.PreviewGroup>
          </div>
        )}
        {new Date(event.startDate) < Date.now() ? (
          ''
        ) : (
          <>
            <p className='text'>{seats} seats left.</p>
            {event.participants &&
            event.participants.filter((part) => part === user.user._id).length > 0 ? (
              <Button
                type='danger'
                onClick={removeHandle}
                className='join-btn'
                loading={confirmLoading}
              >
                Sorry, I can't Attend
              </Button>
            ) : (
              <>
                {seats === 0 && (
                  <p>
                    But you still have a chance!, please fill Non-Members form below and we will
                    contact you if any position become available :){' '}
                  </p>
                )}
                <Button
                  type='primary'
                  onClick={joinHandle}
                  className='join-btn'
                  loading={confirmLoading}
                  disabled={!seats}
                >
                  Join This Event!
                </Button>
              </>
            )}

            {event.allowNonMembers === true ? (
              <p>
                Non-Members are Welcomed!{' '}
                <a href='#' onClick={() => setVisible(true)}>
                  Click here To Join.
                </a>
              </p>
            ) : (
              ''
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Event
