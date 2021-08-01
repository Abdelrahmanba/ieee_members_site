import HeaderItem from '../header-item/headerItem'
import './publicHeaderMenus.scss'
import { useSelector } from 'react-redux'

const PublicHeaderUser = ({ visible }) => {
  const user = useSelector((state) => state.user.user)
  const name = user.firstName + ' ' + user.lastName

  return (
    <ul className={`header__menu header__menu--user ${visible ? 'header__menu--visible' : ''}`}>
      {user.firstName ? (
        <HeaderItem location={'/Member/home'} text={name} extraClass={'menu-signin'} type='link' />
      ) : (
        <>
          <HeaderItem
            location={'/signin'}
            text={'Sign In'}
            extraClass={'menu-signin'}
            type='link'
          />
          <HeaderItem
            location={'/signup'}
            text={'Join Us'}
            extraClass={'menu-signup'}
            type='link'
          />
        </>
      )}
    </ul>
  )
}

export default PublicHeaderUser
