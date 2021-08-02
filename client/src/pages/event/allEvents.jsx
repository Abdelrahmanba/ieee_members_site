import EventList from '../../components/event/eventList/eventList'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/emptyHeader'
import UserHeaderSections from '../../components/header/userMenus/userMenuSections'
import PublicHeaderAlt from '../../components/header/publicHeaderAlt'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './allEvents.styles.scss'
import { message, Pagination } from 'antd'
import { get } from '../../utils/apiCall'

const socites = {
  all: 'All',
  computer: 'Computer',
  pes: 'PES',
  ras: 'RAS',
  wie: 'WIE',
}

const AllEvents = () => {
  const user = useSelector((state) => state.user)
  const [old, setOld] = useState(false)
  const [skip, setSkip] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const { type } = useParams()

  useEffect(() => {
    const fetchCount = async () => {
      const res = await get('/countEvents/' + type)
      if (res.ok) {
        const resJson = await res.json()
        setTotalCount(resJson.count)
      } else {
        message.error('Something went wrong.')
      }
    }
    fetchCount()
  }, [])

  const changePage = (page, pageSize) => {
    setSkip((page - 1) * pageSize)
  }

  return (
    <React.Fragment>
      {user.token ? (
        <Header>
          <UserHeaderSections />
        </Header>
      ) : (
        <PublicHeaderAlt />
      )}
      <div className='body allevents'>
        <h1 className={type}>
          {socites[type]}
          <span> Events</span>
        </h1>
        <EventList setOld={setOld} society={type} button={false} limit={9} skip={skip} />
        <Pagination
          style={{ width: '100%', textAlign: 'center' }}
          defaultCurrent={1}
          total={totalCount}
          onChange={changePage}
          pageSize={9}
          hideOnSinglePage
        />
      </div>
    </React.Fragment>
  )
}
export default AllEvents
