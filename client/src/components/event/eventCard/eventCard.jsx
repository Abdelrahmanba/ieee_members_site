import { useState } from 'react'
import './eventCard.styles.scss'
import { Link } from 'react-router-dom'
import {
  CalendarOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  BankOutlined,
  LeftOutlined,
} from '@ant-design/icons'
import { Typography } from 'antd'

const EventCard = ({
  id,
  title,
  date,
  location,
  price,
  description,
  featured,
  society,
  ...props
}) => {
  const [infoVis, setInfoVis] = useState(false)
  return (
    <div className='event-card' {...props}>
      <div className={`event-card-info ${infoVis ? 'visible' : ''}`}>
        <div
          className={`card-info-bg ${society}`}
          style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/uploads/${featured})` }}
        />
        <LeftOutlined onClick={() => setInfoVis(false)} className='back-arrow' />
        <div className='event-card-label-info'>{title}</div>
        <div className='table'>
          <div className='event-card-table'>
            <div className='event-card-table-icon'>
              <CalendarOutlined style={{ fontSize: 24 }} />
            </div>
            <div className='event-card-table-data'> {new Date(date).toLocaleDateString()}</div>
          </div>
          <div className='event-card-table'>
            <div className='event-card-table-icon'>
              <ClockCircleOutlined style={{ fontSize: 24 }} />
            </div>
            <div className='event-card-table-data'>
              {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <div className='event-card-table'>
            <div className='event-card-table-icon'>
              <BankOutlined style={{ fontSize: 24 }} />
            </div>
            <div className='event-card-table-data'> {location}</div>
          </div>
          <div className='event-card-table'>
            <div className='event-card-table-icon'>
              <DollarOutlined style={{ fontSize: 24 }} />
            </div>
            <div className='event-card-table-data'> {price === 0 ? 'Free' : price + ' ₪'}</div>
          </div>
        </div>
        <Link className={`link ${society}`} to={'/event/' + id}>
          Learn More
        </Link>
      </div>

      <div onClick={() => setInfoVis(true)}>
        <div className={`event-card-date ${society}`}>
          <span className='day'>{new Date(date).getDate()}</span>
          <span className='month'>
            {new Date(date).toLocaleString('default', { month: 'short' })}
          </span>
        </div>
        <div
          className='event-card-cover'
          style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/uploads/${featured})` }}
        >
          <div className='event-card-label'>{title}</div>
        </div>
        <Typography.Paragraph ellipsis={{ rows: 3 }} className='event-card-descripton'>
          {description}
        </Typography.Paragraph>
      </div>
    </div>
  )
}

export default EventCard
