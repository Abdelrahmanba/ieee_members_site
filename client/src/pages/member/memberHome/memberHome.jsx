import { useState } from 'react'
import Container from '../../../components/container/container'
import EventList from '../../../components/event/eventList/eventList'
import Top3Points from '../../../components/member/top3Points/top3Points'
import MemberSection from '../../../components/member/memberSection/memberSection'
import './memberHome.styles.scss'

const UserHome = () => {
  const [old, setOld] = useState(false)
  return (
    <>
      <div className='body'>
        <MemberSection title={old ? 'Recent Events' : 'Upcoming Events'}>
          <Container fullWidth>
            <EventList limit={3} notExpired={true} setOld={setOld} />
          </Container>
        </MemberSection>
        <MemberSection title={'Top Members'}>
          <Top3Points />
        </MemberSection>
      </div>
    </>
  )
}

export default UserHome
