import HeaderItem from "../header-item/headerItem"
import "./userMenuSections.scss"
import { Space, Tooltip } from "antd"
import {
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
  ExportOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons"

const UserHeaderSections = ({ visible }) => {
  return (
    <>
      <ul
        className={`header__menu header__user__menu ${
          visible ? "header__menu--visible" : ""
        }`}
      >
        <Space size={35}>
          <HeaderItem
            location={"/dashboard/home"}
            text={
              <Tooltip placement="bottom" title={"Home"}>
                <HomeOutlined style={{ fontSize: "24px" }} />
              </Tooltip>
            }
            extraClass={"menu-list user-list"}
          />
          <HeaderItem
            location={"/dashboard/events"}
            text={
              <Tooltip placement="bottom" title={"Events"}>
                <CalendarOutlined style={{ fontSize: "24px" }} />
              </Tooltip>
            }
            extraClass={"menu-list user-list"}
          />
          <HeaderItem
            location={"/dashboard/members"}
            text={
              <Tooltip placement="bottom" title={"Members"}>
                <TeamOutlined style={{ fontSize: "24px" }} />
              </Tooltip>
            }
            extraClass={"menu-list user-list"}
          />
          <HeaderItem
            location={"/dashboard/points"}
            text={
              <Tooltip placement="bottom" title={"Points"}>
                <TrophyOutlined style={{ fontSize: "24px" }} />
              </Tooltip>
            }
            extraClass={"menu-list user-list"}
          />
        </Space>
      </ul>
      <ul className="header__menu header__user__menu header__menu--user">
        <Space size={20}>
          <HeaderItem
            location={"/dashboard/profile"}
            text={
              <Tooltip placement="bottom" title={"Profile"}>
                <UserOutlined style={{ fontSize: "24px" }} />
              </Tooltip>
            }
            extraClass={"menu-list user-list"}
          />
          <HeaderItem
            location={"/dashboard/settings"}
            text={
              <Tooltip placement="bottom" title={"Settings"}>
                <SettingOutlined style={{ fontSize: "24px" }} />
              </Tooltip>
            }
            extraClass={"menu-list user-list"}
          />
          <HeaderItem
            location={"/signout"}
            text={
              <Tooltip placement="bottom" title={"Log Out"}>
                <ExportOutlined style={{ fontSize: "24px" }} />
              </Tooltip>
            }
            extraClass={"menu-list user-list"}
          />
        </Space>
      </ul>
    </>
  )
}

export default UserHeaderSections
