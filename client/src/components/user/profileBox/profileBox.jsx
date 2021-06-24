import { Empty, List, Avatar, Spin } from "antd"
import { useEffect, useState } from "react"
import { LoadingOutlined } from "@ant-design/icons"
import "./profileBox.scss"

const spinner = <LoadingOutlined style={{ fontSize: 30 }} spin />

const ProfileEventsBox = ({ token, url, title }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + url, {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      })
      const resJson = await res.json()
      setData(resJson)
      setLoading(false)
    }
    fetchData()
  }, [token, url])

  return (
    <div className="profile__events profile__box">
      <Spin indicator={spinner} spinning={loading}>
        <h2>{title}</h2>
        {!loading && data.length > 0 ? (
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
                  description={item.description}
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Spin>
    </div>
  )
}

export default ProfileEventsBox
