import { Statistic } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './userCount.styles.scss'
const UserCount = () => {
  const [userCount, setUserCount] = useState({ countAll: 0, countActive: 0, countWaiting: 0 })
  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + '/users/count', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      const resJosn = await res.json()
      if (res.ok) {
        setUserCount(resJosn)
      }
    }
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='count-admin'>
      <Statistic title='All Members' value={userCount.countAll} />
      <Statistic title='Active Members' value={userCount.countActive} />
      <Statistic title='Waiting Members' value={userCount.countWaiting} />
    </div>
  )
}

export default UserCount
