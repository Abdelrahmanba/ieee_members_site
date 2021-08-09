import { useSelector } from 'react-redux'
import './event.styles.scss'
import Header from '../../components/header/emptyHeader'
import UserHeaderSections from '../../components/header/userMenus/userMenuSections'
import { Button, Image, message } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NonMembersModel from '../../components/event/nonmembersEventModal/NonMembersModal'
import computerLogo from '../../assets/socities/computer_logo.png'
import rasLogo from '../../assets/socities/robotcs_logo.png'
import pesLogo from '../../assets/socities/pes_logo.png'
import wieLogo from '../../assets/socities/woman_logo.png'
import PublicHeaderAlt from '../../components/header/publicHeaderAlt'
import { get } from '../../utils/apiCall'
import EventInfo from '../../components/event/eventInfo/eventInfo'
import React from 'react'

const socites = {
  computer: computerLogo,
  pes: pesLogo,
  ras: rasLogo,
  wie: wieLogo,
}
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
        <header className={event.society}>
          {event && event.society && <img alt='society' src={socites[event.society]} />}
          <h1>{event && event.title}</h1>
        </header>
        <div className='container-event'>
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
          <div className='desc'>
            <h2>Description</h2>
            <p className='typo'>{event.description}</p>
          </div>
        )}
        {event && event.images && event.images.length > 0 && (
          <div className='preview'>
            <h2 className='header-text'>Event Gallery</h2>
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
                <Button
                  type='link'
                  href='#'
                  style={{ padding: 1 }}
                  onClick={() => setVisible(true)}
                >
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
