import HeaderItem from '../header-item/headerItem'
import './publicHeaderMenus.scss'

const PublicHeaderMenusAlt = ({ visible }) => {
  return (
    <ul className={`header__menu header__menu--user ${visible ? 'header__menu--visible' : ''}`}>
      <>
        <HeaderItem location={'/signin'} text={'Sign In'} extraClass={'menu-signin'} />
        <HeaderItem location={'/signup'} text={'Join Us'} extraClass={'menu-signup'} />
      </>
    </ul>
  )
}

export default PublicHeaderMenusAlt
