import { useEffect, useState } from 'react'
import { get } from '../../../utils/apiCall'
import CommitteeCard from '../../committeeCard/committeeCard'
const CommitteeLisiting = ({ clickable }) => {
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
      {committee
        .sort(function (a, b) {
          if (a.position === 'Chair') {
            return -1
          } else if (b.position === 'Chair') {
            return 1
          }
          if (a.position === 'Vice Chair') {
            return -1
          }
          if (
            a.position.includes(' Chair') &&
            (b.position !== 'Chair' || b.position !== 'Vice Chair')
          ) {
            return -1
          } else {
            return 1
          }
        })
        .map((user, index) => (
          <CommitteeCard
            key={index}
            name={user.firstName + ' ' + user.lastName}
            position={user.position}
            avatar={user.imageData}
            id={user._id}
            clickable={clickable}
          />
        ))}
    </>
  )
}

export default CommitteeLisiting
