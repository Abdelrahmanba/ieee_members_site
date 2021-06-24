import { UserOutlined, TrophyTwoTone } from "@ant-design/icons"
import { Avatar } from "antd"

import "./userCard.scss"
import { useHistory } from "react-router-dom"

const UserCard = ({ name, position, points, avatar, index, id }) => {
  const history = useHistory()

  const openProfile = () => {
    history.push("/Member/profile/" + id)
  }

  return (
    <div key={index} className="user__card" onClick={openProfile}>
      <div className="users__card__bg" />
      {avatar ? (
        <div
          style={{
            backgroundImage: "url(data:image/png;base64," + avatar + ")",
          }}
          className="user__card__image"
        />
      ) : (
        <Avatar
          icon={<UserOutlined style={{ fontSize: 32, marginTop: 16 }} />}
          className="user__card__image"
        />
      )}
      <div className="user__card__info">
        <h2> {name}</h2>
        <div>
          <h3>{position}</h3>
          <h4>
            <TrophyTwoTone twoToneColor="#d4af37" style={{ fontSize: 18 }} />
            {points}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default UserCard
