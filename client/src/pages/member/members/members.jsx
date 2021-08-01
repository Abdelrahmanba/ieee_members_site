import './members.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import AllMembersListing from '../../../components/member/allMembersListing/allMembersListing'
import CommitteeLisiting from '../../../components/member/committeeLisiting/committeeLisitng'

const Members = () => {
  const token = useSelector((state) => state.user.token)
  const [loading, setLoading] = useState(true)

  return (
    <>
      <div className='users__body'>
        <h1 className='user__title'>Our Enthusiastic Team</h1>
        <CommitteeLisiting />
      </div>
      <AllMembersListing token={token} />
    </>
  )
}

export default Members
