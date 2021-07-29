import Header from './emptyHeader'
import UserMenuSections from './userMenus/userMenuSections'

const UserHeader = ({ links }) => {
  return (
    <Header>
      <UserMenuSections />
    </Header>
  )
}

export default UserHeader
