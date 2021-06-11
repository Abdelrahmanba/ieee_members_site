import { Skeleton, Image, Avatar, Spin } from "antd"
import Header from "../../components/header/emptyHeader"
import UserHeaderSections from "../../components/header/userMenus/userMenuSections"
import "./profile.styles.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { LoadingOutlined } from "@ant-design/icons"

const spinner = <LoadingOutlined style={{ fontSize: 45 }} spin />

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  const token = useSelector((state) => state.user.token)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/users/me", {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      })
      const resJson = await res.json()
      setLoading(false)
      setUser(resJson.user)
    }
    fetchData()
  }, [])

  return (
    <>
      <Header>
        <UserHeaderSections />
      </Header>
      <Spin spinning={loading} indicator={spinner}>
        <div className="profile">
          <Avatar
            src={
              <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            className="profile__picture"
          />
          <h1 className="profile__name">
            {user.firstName + " " + user.lastName}
          </h1>
          <div className="profile__container">
            <div className="profile__info"></div>
          </div>
        </div>
      </Spin>
    </>
  )
}

export default Profile
