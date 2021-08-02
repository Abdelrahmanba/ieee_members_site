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
      <AllMembersListing token={token} />
    </>
  )
}

export default Members
