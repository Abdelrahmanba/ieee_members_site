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
        <Container fullWidth>
          <EventList limit={3} notExpired={true} setOld={setOld} />
        </Container>
      </UserSection>
      {societies.map((s, i) => (
        <UserSection title={'Computer Society Events'} key={i}>
          <Container fullWidth>
            <EventList limit={3} notExpired={true} society='computer' />
          </Container>
        </UserSection>
      ))}
    </div>
  )
}

export default Events
