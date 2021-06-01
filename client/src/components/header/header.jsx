import React from "react"
import "./header.styles.scss"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../logo.svg"

const Header = () => (
  <header className="header">
    <a href="logo-link">
      <Logo className="logo-svg" />
    </a>
    <ul className="header-menu">
      <li className="header-menu-item">
        <Link to="/achievments" className="header-menu-link">
          Events
        </Link>
      </li>
      <li className="header-menu-item">
        <Link to="/team" className="header-menu-link">
          Achievemnets
        </Link>
      </li>
      <li className="header-menu-item">
        <Link to="/achievments" className="header-menu-link">
          Our Team
        </Link>
      </li>
      <li className="header-menu-item">
        <Link to="/achievments" className="header-menu-link">
          Societies
        </Link>
      </li>
      <li className="header-menu-item">
        <Link
          to="/achievments"
          className="header-menu-link header-menu-link-bolded"
        >
          <span>Join Us!</span>
        </Link>
      </li>
    </ul>
  </header>
)

export default Header
