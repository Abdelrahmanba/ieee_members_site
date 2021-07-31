import { useState } from 'react'
import Container from '../../../components/container/container'
import EventList from '../../../components/eventList/eventList'
import UserSection from '../../../components/userSection/userSection'
import './events.styles.scss'

const Events = () => {
  const [old, setOld] = useState(false)

  return (
    <div className='body'>
      <UserSection title={old ? 'Recent Events' : 'Upcoming Events'}>
        <Container fullWidth>
          <EventList limit={3} notExpired={true} setOld={setOld} />
        </Container>
      </UserSection>
      <UserSection title={'Computer Society Events'}>
        <Container fullWidth>
          <EventList limit={3} notExpired={true} society='computer' />
        </Container>
      </UserSection>
      <UserSection title={'PES Society Events'}>
        <Container fullWidth>
          <EventList limit={3} notExpired={true} society='pes' />
        </Container>
      </UserSection>
      <UserSection title={'RAS Society Events'}>
        <Container fullWidth>
          <EventList limit={3} notExpired={true} society='ras' />
        </Container>
      </UserSection>
      <UserSection title={'WIE Society Events'}>
        <Container fullWidth>
          <EventList limit={3} notExpired={true} society='wie' />
        </Container>
      </UserSection>
    </div>
  )
}

export default Events
