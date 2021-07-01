import "./achivemnt.styles.scss"
import CountUp from "react-countup"
import VisibilitySensor from "react-visibility-sensor"

const Achivemnt = ({ num, label, icon, content, ...props }) => {
  return (
    <div className="achivemnt" {...props}>
      <img src={icon} className="icon" />
      <CountUp end={num}>
        {({ countUpRef, start }) => (
          <VisibilitySensor onChange={start} delayedCall>
            <span className="count" ref={countUpRef} />
          </VisibilitySensor>
        )}
      </CountUp>
      <h1>{label}</h1>
      <p>{content}</p>
    </div>
  )
}

export default Achivemnt
