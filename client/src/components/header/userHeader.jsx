import Header from './emptyHeader'
import PublicHeader from './publicHeader'
import UserMenuSections from './userMenus/userMenuSections'

const UserHeader = ({ links }) => {
  return (
    <Header>
      <UserMenuSections />
    </Header>
  )
}

export default UserHeader
