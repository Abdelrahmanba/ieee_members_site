import { NavLink } from "react-router-dom"
import "./headerItem.styles.scss"

const HeaderItem = ({ text, location, extraClass }) => {
  return (
    <li className={`header-menu-item`}>
      <NavLink
        to={location}
        className={`header-menu-link ${extraClass}`}
        activeClassName="selected"
      >
        {text}
      </NavLink>
    </li>
  )
}

export default HeaderItem
