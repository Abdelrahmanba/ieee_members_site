import './adminHome.styles.scss'
import UserCount from '../../../components/admin/userCount/userCount'
import WaitingTable from '../../../components/admin/waitingTable/waitingTabel'
import { useSelector } from 'react-redux'
import AnnouncementsTable from '../../../components/admin/announcementsTable/announcementsTable'
import SystemInfo from '../../../components/systemInfo/systemInfo'
import PointsList from '../../../components/admin/pointsList/pointsList'
const AdminHome = () => {
  const user = useSelector((state) => state.user.user)
  return (
    <>
      <div className='body'>
        <h1 className='title' style={{ marginBottom: 40 }}>
          Welcome Back, {user.firstName}!
        </h1>
        <UserCount />
        {user.role === 'admin' && <SystemInfo />}
        <PointsList type='committee' />
        <AnnouncementsTable />
        <WaitingTable />
      </div>
    </>
  )
}

export default AdminHome
