import { useEffect, useState } from 'react'
import EventCard from '../eventCard/eventCard'
import { get } from '../../../utils/apiCall'
import { Button, message, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './eventList.styles.scss'
import { useHistory } from 'react-router-dom'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const EventList = ({ setOld, limit, notExpired, skip, society, button }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const fetchOldEvents = async () => {
    const oldevents = await get(`/event?limit=${limit}&skip=${skip}`)
    if (oldevents.ok) {
      const eventsJson = await oldevents.json()
      setEvents(eventsJson)
      setOld(true)
      setLoading(false)
    }
  }

  const fetchSociety = async () => {
    const data = await get(`/event?limit=${limit}&society=${society}&skip=${skip}`)
    if (data.ok) {
      const resJson = await data.json()
      setEvents(resJson)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (society !== undefined) {
      fetchSociety()
      return
    }
    const fetchUpcoming = async () => {
      const upComing = await get(`/event?limit=${limit}&notExpired=${notExpired}&skip=${skip}`)
      if (upComing.ok) {
        const resJson = await upComing.json()
        if (resJson.length === 0) {
          fetchOldEvents()
        } else {
          setEvents(resJson)
          setOld(false)
          setLoading(false)
        }
      } else {
        message.error('Something Worng.')
      }
      // }
    }
    fetchUpcoming()
  }, [skip]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Spin spinning={loading} indicator={antIcon} wrapperClassName='spin'>
      <div className='event-section'>
        <section>
          {events.map(
            ({ title, startDate, _id, location, price, description, featured, society }) => (
              <EventCard
                data-aos='fade-up'
                key={_id}
                title={title}
                date={new Date(startDate).toISOString()}
                location={location}
                id={_id}
                price={price}
                description={description}
                featured={featured}
                society={society}
              />
            )
          )}
        </section>
        {button && (
          <Button
            type='primary'
            style={{ marginTop: 20, width: 200 }}
            className={`socities-btn ${society}`}
            onClick={() => history.push('/AllEvents/' + (society ? society : 'all'))}
          >
            View All Events
          </Button>
        )}
      </div>
    </Spin>
  )
}

export default EventList
