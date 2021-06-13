import { Empty, List, Descriptions, Image, Avatar, Spin } from "antd"
import Header from "../../components/header/emptyHeader"
import UserHeaderSections from "../../components/header/userMenus/userMenuSections"
import "./profile.styles.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { LoadingOutlined, UserOutlined } from "@ant-design/icons"
import ProfileEventsBox from "../../components/user/profileEvents/profileEvents"

const spinner = <LoadingOutlined style={{ fontSize: 45 }} spin />
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
]
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
  })

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
            {user.firstName + " " + user.lastName}
          </h1>
          <div className="profile__container">
            <div className="profile__info profile__box">
              <Descriptions
                colomn={{ xs: 1, sm: 1, md: 1 }}
                labelStyle={{
                  color: "#0275A9",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                contentStyle={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                title={<h2>Member Info</h2>}
              >
                <Descriptions.Item label="Membership ID">
                  {user.memberId ? user.memberId : "Not Provided"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {user.email}
                </Descriptions.Item>
                <Descriptions.Item label="Birthday">
                  {user.bday
                    ? new Date(user.bday).getFullYear() +
                      "/" +
                      new Date(user.bday).getMonth() +
                      "/" +
                      new Date(user.bday).getDay()
                    : "Not Provided"}
                </Descriptions.Item>
                <Descriptions.Item label="Position">
                  {user.position ? user.position : "Not Provided"}
                </Descriptions.Item>
                <Descriptions.Item label="Points">
                  <p>{user.points}</p>
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className="profil__events profile__box">
              <h2>Events I Particepated In:</h2>
              {user.events && user.events.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
            <ProfileEventsBox />
          </div>
        </div>
      </Spin>
    </>
  )
}

export default Profile
