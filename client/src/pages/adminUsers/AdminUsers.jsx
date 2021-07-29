import './AdminUsers.styles.scss'
import WaitingTable from '../../components/admin/waitingTable/waitingTabel'
import MembersTable from '../../components/admin/membersTable/membersTable'

const AdminUsers = () => {
  return (
    <div className='body'>
      <WaitingTable />
      <MembersTable />
    </div>
  )
}

export default AdminUsers
