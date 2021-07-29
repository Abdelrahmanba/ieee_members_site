import { useState } from 'react'
import Container from '../../components/container/container'
import EventList from '../../components/eventList/eventList'
import Top3Points from '../../components/top3Points/top3Points'
import UserSection from '../../components/userSection/userSection'
import './userHome.styles.scss'

const UserHome = () => {
  const [old, setOld] = useState(false)
  return (
    <>
      <div className='body'>
        <UserSection title={old ? 'Recent Events' : 'Upcoming Events'}>
          <Container fullWidth>
            <EventList limit={3} notExpired={true} setOld={setOld} />
          </Container>
        </UserSection>
        <UserSection title={'Top Members'}>
          <Top3Points />
        </UserSection>
      </div>
    </>
  )
}

export default UserHome
