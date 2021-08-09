import './adminHome.styles.scss'
import UserCount from '../../../components/admin/userCount/userCount'
import WaitingTable from '../../../components/admin/waitingTable/waitingTabel'
import { useSelector } from 'react-redux'
import AnnouncementsTable from '../../../components/admin/announcementsTable/announcementsTable'
import SystemInfo from '../../../components/systemInfo/systemInfo'
const AdminHome = () => {
  const name = useSelector((state) => state.user.user.firstName)
  return (
    <>
      <div className='body'>
        <h1 className='title' style={{ marginBottom: 40 }}>
          Welcome Back, {name}!
        </h1>
        <SystemInfo />
        <UserCount />
        <AnnouncementsTable />
        <WaitingTable />
      </div>
    </>
  )
}

export default AdminHome
