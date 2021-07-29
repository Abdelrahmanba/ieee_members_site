import { useEffect, useState } from 'react'
import EventCard from '../eventCard/eventCard'
import { Spin } from 'antd'
const EventList = ({ setOld, limit, notExpired, skip, society }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let query = process.env.REACT_APP_API_URL + `/event?limit=${limit}&notExpired=${notExpired}`
    const fetchEvents = async () => {
      if (society !== undefined) {
        query = process.env.REACT_APP_API_URL + `/event?limit=${limit}&society=${society}`
        const data = await fetch(query)
        if (data.ok) {
          const resJson = await data.json()
          setEvents(resJson)
          return
        }
        setLoading(false)
      } else {
        const upevents = await fetch(query)
        if (upevents.ok) {
          const resJson = await upevents.json()
          if (resJson.length === 0) {
            const oldevents = await fetch(process.env.REACT_APP_API_URL + '/event?limit=3')
            const eventsJson = await oldevents.json()
            setEvents(eventsJson)
            setOld(true)
          } else {
            setEvents(resJson)
            setOld(false)
          }
          setLoading(false)
        }
      }
    }
    fetchEvents()
  }, [])

  return (
    <>
      {events.map(({ title, startDate, _id, location, price, description, featured, society }) => (
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
      ))}
    </>
  )
}

export default EventList
