import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { get } from '../../../utils/apiCall'
import './announcement.styles.scss'
import {
  NotificationOutlined,
  CalendarOutlined,
  LinkOutlined,
  ClockCircleOutlined,
  ScheduleOutlined,
  CompassOutlined,
  TeamOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons'

const Announcemnt = () => {
  const { id } = useParams()
  const token = useSelector((state) => state.user.token)
  const [data, setData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const res = await get('/announcement/' + id, token)
      if (res.ok) {
        const resJson = await res.json()
        setData(resJson)
        console.log(resJson)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='body announcment'>
      <h1 className='title'>
        <NotificationOutlined className='logo' />
        {data.title}
      </h1>
      <img src={process.env.REACT_APP_API_URL + '/uploads/' + data.featured} />
      <div className='ann__box'>
        <div className='ann-box-body'>
          <h2 className='ann-title'>Details</h2>
          <div className='ann-box-row'>
            <div className='label'>
              <CalendarOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
              Date
            </div>
            {data && new Date(data.date).toDateString()}
          </div>
          <div className='ann-box-row'>
            <div className='label'>
              <CalendarOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
              Deadline
            </div>
            {data && new Date(data.deadline).toDateString()}
          </div>

          {data && data.link && (
            <div className='ann-box-row'>
              <div className='label'>
                <LinkOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
                Link
              </div>
              {<a href={data.link}>Click Here</a>}
            </div>
          )}
          <div className='ann-box-row desc'>
            <div className='label'>
              <CalendarOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
              Description
            </div>
            {data && data.description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Announcemnt
