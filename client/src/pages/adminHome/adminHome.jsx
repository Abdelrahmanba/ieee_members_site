import './adminHome.styles.scss'
import Header from '../../components/header/emptyHeader'
import AdminMenuSections from '../../components/header/userMenus/adminMenuSection'
import UserCount from '../../components/admin/userCount/userCount'
import WaitingTable from '../../components/admin/waitingTable/waitingTabel'
const AdminHome = () => {
  return (
    <>
      <Header>
        <AdminMenuSections />
      </Header>
      <div className='body'>
        <UserCount />
        <WaitingTable />
      </div>
    </>
  )
}

export default AdminHome
