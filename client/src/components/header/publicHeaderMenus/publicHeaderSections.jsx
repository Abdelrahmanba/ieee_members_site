import HeaderItem from "../header-item/headerItem"
import "./publicHeaderMenus.scss"

const PublicHeaderSections = ({ visible }) => {
  return (
    <ul className={`header__menu ${visible ? "header__menu--visible" : ""}`}>
      <HeaderItem location={"about"} text={"About"} extraClass={"menu-list"} />
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
  )
}

export default PublicHeaderSections
