import { useState } from "react"
import "./header.styles.scss"
import { ReactComponent as Logo } from "../../logo.svg"
import HeaderItem from "../header-item/headerItem"

const Header = () => {
  const [visible, setVisible] = useState(false)

  return (
    <header className="header">
      <a href="/">
        <Logo className="logo-svg" />
      </a>
      <ul className={`header-menu ${visible ? "menu-visible" : ""}`}>
        <HeaderItem
          location={"events"}
          text={"Events"}
          extraClass={"menu-list"}
        />
        <HeaderItem
          location={"achievemnets"}
          text={"Achievemnets"}
          extraClass={"menu-list"}
        />
        <HeaderItem
          location={"societies"}
          text={"Societies"}
          extraClass={"menu-list"}
        />
        <HeaderItem
          location={"team"}
          text={"Our Team"}
          extraClass={"menu-list"}
        />
      </ul>
      <ul
        className={`header-menu header-user ${visible ? "menu-visible" : ""}`}
      >
        <HeaderItem
          location={"/signin"}
          text={"Sign In"}
          extraClass={"menu-signin"}
        />
        <HeaderItem
          location={"/signup"}
          text={"Join Us"}
          extraClass={"menu-signup"}
        />
      </ul>

      <svg
        className="burger"
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
