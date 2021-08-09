import './members.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import AllMembersListing from '../../../components/member/allMembersListing/allMembersListing'

const Members = () => {
  const token = useSelector((state) => state.user.token)

  return (
    <>
      <AllMembersListing token={token} />
    </>
  )
}

export default Members
