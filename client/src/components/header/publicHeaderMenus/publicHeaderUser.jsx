import HeaderItem from "../header-item/headerItem"
import "./publicHeaderMenus.scss"
import { useSelector } from "react-redux"

const PublicHeaderUser = ({ visible }) => {
  const user = useSelector((state) => state.user.user)
  const name = user.firstName + " " + user.lastName

  return (
    <ul
      className={`header__menu header__menu--user ${
        visible ? "header__menu--visible" : ""
      }`}
    >
      {user.firstName ? (
        <HeaderItem
          location={"/user/dashboard"}
          text={name}
          extraClass={"menu-signin"}
        />
      ) : (
        <>
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
        </>
      )}
    </ul>
  )
}

export default PublicHeaderUser
