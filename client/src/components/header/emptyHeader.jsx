import { useState } from "react"
import "./header.styles.scss"
import { ReactComponent as Logo } from "../../logo.svg"

const Header = ({ children }) => {
  const [visible, setVisible] = useState(false)
  return (
    <header className={`header ${visible ? "header--visible" : ""}`}>
      <a href="/">
        <Logo />
      </a>
      {children}
      <svg
        className="header__burger"
        viewBox="0 0 100 80"
        width="30"
        height="30"
        fill="#0275A9"
        onClick={() => setVisible(!visible)}
      >
        <rect width="100" height="10"></rect>
        <rect y="30" width="100" height="10"></rect>
        <rect y="60" width="100" height="10"></rect>
      </svg>
    </header>
  )
}
export default Header
