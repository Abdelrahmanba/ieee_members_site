import './adminHome.styles.scss'
import UserCount from '../../../components/admin/userCount/userCount'
import WaitingTable from '../../../components/admin/waitingTable/waitingTabel'
import { useSelector } from 'react-redux'
const AdminHome = () => {
  const name = useSelector((state) => state.user.user.firstName)
  return (
    <>
      <div className='body'>
        <h1 className='title' style={{ marginBottom: 40 }}>
          Welcome Back, {name}!
        </h1>
        <UserCount />
        <WaitingTable />
      </div>
    </>
  )
}

export default AdminHome
