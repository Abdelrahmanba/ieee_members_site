import {
  CalendarOutlined,
  LinkOutlined,
  ClockCircleOutlined,
  ScheduleOutlined,
  CompassOutlined,
  TeamOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons'

const EventInfo = ({ event }) => {
  return (
    <div className='event__box'>
      <div className='event-box-body'>
        <h2 className='event-title'>Event Details</h2>
        <div className='event-box-row'>
          <div className='label'>
            <CalendarOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
            Start Date
          </div>
          {event && new Date(event.startDate).toDateString()}
        </div>
        <div className='event-box-row'>
          <div className='label'>
            <ClockCircleOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
            Start Time
          </div>
          {event && new Date(event.startDate).toLocaleTimeString([], { timeStyle: 'short' })}
        </div>
        <div className='event-box-row'>
          <div className='label'>
            <ScheduleOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
            Duration
          </div>
          {event && event.duration}
        </div>
        <div className='event-box-row'>
          <div className='label'>
            <CompassOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
            Location
          </div>
          {event && event.location}
        </div>
        <div className='event-box-row'>
          <div className='label'>
            <TeamOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
            Attendence
          </div>
          {event && event.availableTickets}
        </div>
        <div className='event-box-row'>
          <div className='label'>
            <DollarCircleOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
            Price
          </div>
          {event && event.price === 0 ? 'Free' : event.price + '₪'}
        </div>
        {event && event.link && (
          <div className='event-box-row'>
            <div className='label'>
              <LinkOutlined style={{ color: '#0275a9', paddingRight: 10 }} />
              Link
            </div>
            {<a href={event.link}>Click Here</a>}
          </div>
        )}
      </div>
    </div>
  )
}
export default EventInfo
