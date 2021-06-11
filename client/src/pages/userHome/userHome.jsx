import "./userHome.styles.scss"
import Header from "../../components/header/emptyHeader"
import UserHeaderSections from "../../components/header/userMenus/userMenuSections"

const UserHome = () => {
  return (
    <>
      <Header>
        <UserHeaderSections />
      </Header>
    </>
  )
}

export default UserHome
