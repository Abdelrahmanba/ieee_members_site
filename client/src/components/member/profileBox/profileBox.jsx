import { Empty, List, Avatar, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import computer from '../../../assets/socities/computer.jpg'
import pes from '../../../assets/socities/pes.png'
import wie from '../../../assets/socities/wie.png'
import ras from '../../../assets/socities/ras.jpg'
import { get } from '../../../utils/apiCall'

import './profileBox.scss'

const spinner = <LoadingOutlined style={{ fontSize: 30 }} spin />

const ProfileEventsBox = ({ token, url, title }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const society = { wie: wie, pes: pes, ras: ras, computer: computer }

  useEffect(() => {
    const fetchData = async () => {
      const res = await get(url, token)
      if (res.ok) {
        const resJson = await res.json()
        setData(resJson)
        setLoading(false)
      }
    }
    fetchData()
  }, [token, url])

  return (
    <div className='profile__events profile__box'>
      <Spin indicator={spinner} spinning={loading}>
        <h2>{title}</h2>
        {!loading && data.length > 0 ? (
          title === 'Points History:' ? (
            <List
              itemLayout='horizontal'
              dataSource={data.reverse()}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text code>
                    [{item.amount + ' Points'}]{item.committee && '[Committee]'}
                  </Typography.Text>
                  {'  ' + item.title}
                </List.Item>
              )}
            />
          ) : (
            <List
              itemLayout='horizontal'
              dataSource={data.reverse()}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={society[item.society]} />}
                    title={<Link to={'/Event/' + item._id}>{item.title}</Link>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          )
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Spin>
    </div>
  )
}

export default ProfileEventsBox
