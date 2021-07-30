import { Button } from 'antd'
import { NavLink, useHistory } from 'react-router-dom'
import './headerItem.styles.scss'

const HeaderItem = ({ text, location, extraClass, selected, link, username, ...props }) => {
  const history = useHistory()
  if (selected === undefined && username === undefined) {
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
  } else if (username) {
    return (
      <li {...props} className={`header-menu-item`}>
        <Button
          type='link'
          onClick={() => history.push(location)}
          style={{ color: 'black', fontSize: 20, height: 0 }}
        >
          {text}
        </Button>
      </li>
    )
  } else {
    return (
      <li {...props} className={`header-menu-item`}>
        {selected ? (
          <span className={`header-menu-link ${extraClass} selected-section`}>{text}</span>
        ) : (
          <span className={`header-menu-link ${extraClass}`}>{text}</span>
        )}
      </li>
    )
  }
}

export default HeaderItem
