import { List } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { get } from '../../../utils/apiCall'
import { LoadingOutlined } from '@ant-design/icons'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Announcements = ({}) => {
  const [count, setCount] = useState(0)
  const [announcements, setAnnouncements] = useState([])
  const [skip, setSkip] = useState(0)
  const [limit, setlimit] = useState(5)
  const token = useSelector((state) => state.user.token)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const res = await get(`/announcement?skip=${skip}&limit=${limit}`, token)
      if (res.ok) {
        const resJson = await res.json()
        setCount(resJson.count)
        setAnnouncements(resJson.announcements)
        setLoading(false)
      }
    }
    fetchData()
  }, [skip])
  return (
    <List
      itemLayout='vertical'
      size='large'
      style={{ width: '90%' }}
      loading={{ indicator: antIcon, spinning: loading }}
      pagination={{
        onChange: (page) => {},
        pageSize: 3,
        hideOnSinglePage: true,
      }}
      dataSource={announcements}
      renderItem={(item) => (
        <List.Item
          key={item._id}
          extra={
            <img
              width={150}
              alt='logo'
              src={process.env.REACT_APP_API_URL + '/uploads/' + item.featured}
            />
          }
        >
          <List.Item.Meta
            title={<Link to={'/member/announcement/' + item._id}>{item.title}</Link>}
            description={new Date(item.date).toLocaleDateString()}
          />
          {item.description}
        </List.Item>
      )}
    />
  )
}

export default Announcements
