import MemberSection from '../../../components/member/memberSection/memberSection'
import './memberHome.styles.scss'
import Announcements from '../../../components/member/announcements/announcements'

const UserHome = () => {
  return (
    <>
      <div className='body'>
        <MemberSection title='Announcements'>
          <Announcements />
        </MemberSection>
      </div>
    </>
  )
}

export default UserHome
