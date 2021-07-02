import { NavLink } from 'react-router-dom'
import './headerItem.styles.scss'

const HeaderItem = ({ text, location, extraClass, selected, links, ...props }) => {
  if (selected === undefined || links === true) {
    return (
      <li {...props} className={`header-menu-item`}>
        <NavLink
          to={location}
          className={`header-menu-link ${extraClass}`}
          activeClassName='selected'
        >
          {text}
        </NavLink>
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
