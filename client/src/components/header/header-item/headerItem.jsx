import { Link } from "react-router-dom"
import "./headerItem.styles.scss"

const HeaderItem = ({ text, location, extraClass }) => (
  <li className="header-menu-item">
    <Link to={location} className={`header-menu-link ${extraClass}`}>
      {text}
    </Link>
  </li>
)

export default HeaderItem
