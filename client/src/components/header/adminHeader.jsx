import Header from './emptyHeader'
import AdminMenuSections from './userMenus/adminMenuSection'

const AdminHeader = ({ links }) => {
  return (
    <Header>
      <AdminMenuSections />
    </Header>
  )
}

export default AdminHeader
