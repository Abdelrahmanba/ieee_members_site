import { useHistory } from 'react-router-dom'
import './cpmmitteCard.styles.scss'

const CommitteeCard = ({ name, position, avatar, clickable, id }) => {
  const history = useHistory()
  const openProfile = () => {
    if (clickable) {
      history.push('/Member/profile/' + id)
    }
  }
  return (
    <div className={`committee_card ${clickable ? 'clickable' : ''}`} onClick={openProfile}>
      <div
        style={{
          backgroundImage: 'url(data:image/png;base64,' + avatar + ')',
        }}
        className='committee__card__image'
      />
      <h1>{name}</h1>
      <h2>{position}</h2>
    </div>
  )
}

export default CommitteeCard
