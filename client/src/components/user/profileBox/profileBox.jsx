import { Empty, List, Avatar, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import computer from '../../../assets/socities/computer.jpg'
import pes from '../../../assets/socities/pes.png'
import wie from '../../../assets/socities/wie.png'
import ras from '../../../assets/socities/ras.jpg'

import './profileBox.scss'

const spinner = <LoadingOutlined style={{ fontSize: 30 }} spin />

const ProfileEventsBox = ({ token, url, title }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + url, {
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      })
      const resJson = await res.json()
      setData(resJson)
      setLoading(false)
    }
    fetchData()
  }, [token, url])

  return (
    <div className='profile__events profile__box'>
      <Spin indicator={spinner} spinning={loading}>
        <h2>{title}</h2>
        {!loading && data.length > 0 ? (
          <List
            itemLayout='horizontal'
            dataSource={data.reverse()}
            renderItem={(item) => <List.Item>{item.title}</List.Item>}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Spin>
    </div>
  )
}

export default ProfileEventsBox
