import { useState } from 'react'
import Container from '../../../components/container/container'
import EventList from '../../../components/event/eventList/eventList'
import UserSection from '../../../components/member/memberSection/memberSection'
import './events.styles.scss'

const societies = [
  { title: 'Computer Society Events', name: 'computer' },
  { title: 'RAS Society Events', name: 'ras' },
  { title: 'PES Society Events', name: 'pes' },
  { title: 'WIE Society Events', name: 'wie' },
]

const Events = () => {
  const [old, setOld] = useState(false)

  return (
    <div className='body'>
      <UserSection title={old ? 'Recent Events' : 'Upcoming Events'}>
        <EventList limit={3} notExpired={true} setOld={setOld} />
      </UserSection>
      {societies.map((s, i) => (
        <UserSection title={s.title} key={i}>
          <EventList limit={3} notExpired={true} society={s.name} />
        </UserSection>
      ))}
    </div>
  )
}

export default Events
