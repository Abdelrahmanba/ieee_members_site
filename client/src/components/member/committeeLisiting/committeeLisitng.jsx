import { useEffect, useState } from 'react'
import { get } from '../../../utils/apiCall'
import MemberCard from '../memberCard/memberCard'

const CommitteeLisiting = () => {
  const [committee, setCommittee] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const committee = await get('/users/all/committee')
      if (committee.ok) {
        const committeeJson = await committee.json()
        setCommittee(committeeJson)
      }
    }
    fetchData()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {committee.map((user, index) => (
        <MemberCard
          key={index}
          name={user.firstName + ' ' + user.lastName}
          position={user.position}
          points={user.points}
          avatar={user.imageData}
          id={user._id}
        />
      ))}
    </>
  )
}

export default CommitteeLisiting
