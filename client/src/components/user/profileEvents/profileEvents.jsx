import { Empty, List, Avatar } from "antd"
import "./profileEvents.scss"

const ProfileEventsBox = () => {
  return (
    <div className="profil__events profile__box">
      <h2>Points History:</h2>
      {user.pointsHistory && user.pointsHistory.length > 0 ? (
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
  )
}

export default ProfileEventsBox
