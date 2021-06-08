import PublicHeaderSections from "./publicHeaderMenus/publicHeaderSections"
import PublicHeaderUser from "./publicHeaderMenus/publicHeaderUser"
import Header from "./emptyHeader"
const PublicHeader = () => {
  return (
    <Header>
      <PublicHeaderSections />
      <PublicHeaderUser />
    </Header>
  )
}

export default PublicHeader
