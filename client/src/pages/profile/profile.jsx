import { Image, Avatar, Spin } from "antd"
import Header from "../../components/header/emptyHeader"
import UserHeaderSections from "../../components/header/userMenus/userMenuSections"
import "./profile.styles.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { LoadingOutlined, UserOutlined } from "@ant-design/icons"
import ProfileBox from "../../components/user/profileBox/profileBox"
import ProfileInfoBox from "../../components/user/profileInfo/profileInfo"
import { useParams } from "react-router-dom"

const spinner = <LoadingOutlined style={{ fontSize: 45 }} spin />

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  const token = useSelector((state) => state.user.token)
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/user/" + (id ? id : "me"),
        {
          headers: new Headers({
            Authorization: "Bearer " + token,
          }),
        }
      )
      const resJson = await res.json()
      setLoading(false)
      setUser(resJson)
    }
    fetchData()
  }, [token, id])

  return (
    <>
      <Header>
        <UserHeaderSections />
      </Header>

      <Spin spinning={loading} indicator={spinner}>
        <div className="body">
          {user.imageData ? (
            <Avatar
              src={<Image src={"data:image/png;base64," + user.imageData} />}
              className="profile__picture"
            />
          ) : (
            <Avatar icon={<UserOutlined />} className="profile__picture" />
          )}

          <h1 className="profile__name">
            {!loading ? user.firstName + " " + user.lastName : ""}
          </h1>
          <div className="profile__container">
            <ProfileInfoBox user={user} />
            <ProfileBox
              token={token}
              title="Events I Particepated In:"
              url={"/users/eventsParticipated/" + (id ? id : "")}
            />
            <ProfileBox
              token={token}
              title="Points History:"
              url={"/users/pointsHistory/" + (id ? id : "")}
            />
          </div>
        </div>
      </Spin>
    </>
  )
}

export default Profile
