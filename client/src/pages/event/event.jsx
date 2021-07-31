import { useSelector } from 'react-redux'
import './event.styles.scss'
import Header from '../../components/header/emptyHeader'
import UserHeaderSections from '../../components/header/userMenus/userMenuSections'
import { Button, Image, message } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NonMembersModel from '../../components/event/nonmembersEventModal/NonMembersModal'

import PublicHeaderAlt from '../../components/header/publicHeaderAlt'
import { get } from '../../utils/apiCall'
import EventInfo from '../../components/event/eventInfo/eventInfo'
import React from 'react'

const Event = () => {
  const user = useSelector((state) => state.user)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { id } = useParams()
  const [event, setEvent] = useState({})
  const [seats, setSeats] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await get('/event/' + id)
      if (event.ok) {
        const resJson = await event.json()
        setEvent(resJson)
        setSeats(resJson.availableTickets - resJson.participants.length)
      } else {
        message.error('Sorry, Something went wrong.')
      }
    }
    fetchEvent()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const joinHandle = async () => {
    if (!user.user.phoneNo) {
      message.error('Please Add a Phone Number In Profile Settings to be able to join events.')
      return
    }
    setConfirmLoading(true)
    const res = await get('/event/add_participants/' + id, user.token)
    if (res.ok) {
      const resJson = await res.json()
      setEvent((event) => ({
        ...event,
        participants: resJson,
      }))
      setSeats((seats) => seats - 1)
    } else {
      message.error('Sorry, Something went wrong.')
    }
    setConfirmLoading(false)
  }
  const handleRemove = async () => {
    setConfirmLoading(true)
    const res = await get('/event/remove_participants/' + id, user.token)
    if (res.ok) {
      const resJson = await res.json()
      setEvent((event) => ({
        ...event,
        participants: resJson,
      }))
      setSeats((seats) => seats + 1)
    } else {
      message.error('Sorry, Something went wrong.')
    }
    setConfirmLoading(false)
  }
  return (
    <React.Fragment>
      {user.token ? (
        <Header>
          <UserHeaderSections />
        </Header>
      ) : (
        <PublicHeaderAlt />
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
          {event && event.featured && (
            <img
              src={`${process.env.REACT_APP_API_URL}/uploads/${event.featured}`}
              className='image'
              alt='Featured'
            />
          )}
        </div>
        <EventInfo event={event} />
        {event && event.description && (
          <div className='orgnizers'>
            <h2 className='header-text'>
              <span className='highlight-container sub'>
                <span className='highlight highlight-2 noselect'>Description </span>
              </span>
            </h2>
            <p className='typo'>{event.description}</p>
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
                <Image
                  key={index}
                  width={200}
                  src={`${process.env.REACT_APP_API_URL}/uploads/${src}`}
                />
              ))}
            </Image.PreviewGroup>
          </div>
        )}
        {new Date(event.startDate) < Date.now() ? (
          ''
        ) : (
          <React.Fragment>
            <p className='text'>{seats} seats left.</p>
            {event.participants &&
            event.participants.filter((part) => part.user === user.user._id).length > 0 ? (
              <Button
                type='danger'
                onClick={handleRemove}
                className='join-btn'
                loading={confirmLoading}
              >
                Sorry, I can't Attend
              </Button>
            ) : (
              <React.Fragment>
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
                  disabled={!seats || !user.token}
                >
                  Join This Event!
                </Button>
              </React.Fragment>
            )}
            {event.allowNonMembers === true ? (
              <p>
                Non-Members are Welcomed!
                <Button type='link' href='#' onClick={() => setVisible(true)}>
                  Click here To Join.
                </Button>
              </p>
            ) : (
              ''
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

export default Event
