import { message, Statistic } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get } from '../../../utils/apiCall'
import './userCount.styles.scss'
const UserCount = () => {
  const [userCount, setUserCount] = useState({ countAll: 0, countActive: 0, countWaiting: 0 })
  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    const fetchData = async () => {
      const res = await get('/users/count', token)
      const resJosn = await res.json()
      if (res.ok) {
        setUserCount(resJosn)
      } else {
        message.error('Something Went Worng.')
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
