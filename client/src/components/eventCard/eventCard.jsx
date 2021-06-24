import { useState } from "react"
import "./eventCard.styles.scss"
import { Link, useHistory } from "react-router-dom"
import {
  CalendarOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  BankOutlined,
  LeftOutlined,
} from "@ant-design/icons"
const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  price,
  description,
  image,
}) => {
  const [infoVis, setInfoVis] = useState(false)
  const history = useHistory()

  return (
    <div className="event-card">
      <div className={`event-card-info ${infoVis ? "visible" : ""}`}>
        <div
          className="card-info-bg"
          style={{ backgroundImage: `url(${image})` }}
        />
        <LeftOutlined
          onClick={() => setInfoVis(false)}
          className="back-arrow"
        />
        <div className="event-card-label-info">{title}</div>
        <div className="table">
          <div className="event-card-table">
            <div className="event-card-table-icon">
              <CalendarOutlined style={{ fontSize: 24 }} />
            </div>
            <div className="event-card-table-data"> {date}</div>
          </div>
          <div className="event-card-table">
            <div className="event-card-table-icon">
              <ClockCircleOutlined style={{ fontSize: 24 }} />
            </div>
            <div className="event-card-table-data"> {time}</div>
          </div>
          <div className="event-card-table">
            <div className="event-card-table-icon">
              <BankOutlined style={{ fontSize: 24 }} />
            </div>
            <div className="event-card-table-data"> {location}</div>
          </div>
          <div className="event-card-table">
            <div className="event-card-table-icon">
              <DollarOutlined style={{ fontSize: 24 }} />
            </div>
            <div className="event-card-table-data"> {price}</div>
          </div>
        </div>
        <Link className="link" onClick={() => history.push("/event/" + id)}>
          Learn More
        </Link>
      </div>

      <div onClick={() => setInfoVis(true)}>
        <div className="event-card-date">
          <span className="day">{date}</span>
          <span className="month">{date}</span>
        </div>
        <div
          className="event-card-cover"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="event-card-label">{title}</div>
        </div>
        <p className="event-card-descripton">{description}</p>
      </div>
    </div>
  )
}

export default EventCard
