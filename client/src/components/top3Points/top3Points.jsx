import UserCard from '../../components/userCard/userCard'
import { ReactComponent as Trophy } from '../../assets/icons/trophy.svg'
import { useEffect, useState } from 'react'
import './top3Points.scss'
const Top3Points = () => {
  const [top3, setTop3] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + '/users/top3')
      if (res.ok) {
        const resJosn = await res.json()
        setTop3(resJosn)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='top3'>
      <Trophy className='trophy' />
      {top3.map((user, index) => (
        <UserCard
          key={index}
          name={user.firstName + ' ' + user.lastName}
          position={user.position}
          points={user.points}
          avatar={user.imageData}
          id={user._id}
        />
      ))}
    </div>
  )
}
export default Top3Points
