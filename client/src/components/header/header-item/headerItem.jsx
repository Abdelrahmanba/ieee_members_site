import { Button } from 'antd'
import { Link as RouteLink, NavLink, useHistory } from 'react-router-dom'
import { Link } from 'react-scroll'
import './headerItem.styles.scss'

const HeaderItem = ({ text, location, extraClass, type, ...props }) => {
  const history = useHistory()
  if (type === 'private') {
    return (
      <li {...props} className={`header-menu-item ${extraClass}`}>
        <NavLink
          to={location}
          className={`header-menu-link ${extraClass}`}
          activeClassName='selected'
        >
          {text}
        </NavLink>
      </li>
    )
  } else if (type === 'link') {
    return (
      <li {...props} className={`header-menu-item ${extraClass}`}>
        <Button
          type='link'
          className={`header-menu-link ${extraClass}`}
          onClick={() => history.push(location)}
        >
          {text}
        </Button>
      </li>
    )
  } else {
    return (
      <li {...props} className={`header-menu-item`}>
        <Link
          activeClass='selected-section'
          to={location}
          className={`header-menu-link ${extraClass}`}
          spy={true}
          smooth={true}
          duration={1000}
          offset={-65}
        >
          {text}
        </Link>
      </li>
    )
  }
}

export default HeaderItem
