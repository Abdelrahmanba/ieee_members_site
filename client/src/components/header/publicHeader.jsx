import PublicHeaderSections from './publicHeaderMenus/publicHeaderSections'
import PublicHeaderUser from './publicHeaderMenus/publicHeaderUser'
import Header from './emptyHeader'
const PublicHeader = ({ links }) => {
  return (
    <Header>
      <PublicHeaderSections links={links} />
      <PublicHeaderUser />
    </Header>
  )
}

export default PublicHeader
