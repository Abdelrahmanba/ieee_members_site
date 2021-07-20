import { Statistic } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const UserCount = () => {
  const [userCount, setUserCount] = useState(0)
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
        setUserCount(resJosn.count)
      }
    }
    fetchData()
  }, [])

  return <Statistic title='Active Users' value={userCount} />
}

export default UserCount
