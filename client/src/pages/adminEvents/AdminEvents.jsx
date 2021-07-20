import './AdminEvents.styles.scss'
import Header from '../../components/header/emptyHeader'
import AdminMenuSections from '../../components/header/userMenus/adminMenuSection'
import EventsTable from '../../components/admin/EventsTable/EventsTable'

const AdminEvents = () => {
  return (
    <>
      <Header>
        <AdminMenuSections />
      </Header>
      <div className='body'>
        <EventsTable />
      </div>
    </>
  )
}

export default AdminEvents
