import { Progress, Spin, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import React, { Suspense } from 'react'
import './eventStatistics.style.scss'

const ExportExcel = React.lazy(() => import('../../../components/admin/ExportExcel/ExportExcel'))

const membersColmouns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => {
      return a.name - b.name
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone No',
    dataIndex: 'phoneNo',
  },
  {
    title: 'Points',
    dataIndex: 'points',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => {
      return new Date(a.date) - new Date(b.name)
    },
  },
]
const nonMembersColmouns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => {
      return a.name > b.name
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone No',
    dataIndex: 'phone',
  },
  {
    title: 'Acadimec Year',
    dataIndex: 'year',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => {
      return new Date(a.date) - new Date(b.date)
    },
  },
]

const EventStatistics = () => {
  const { id } = useParams()
  const token = useSelector((state) => state.user.token)
  const [loading, setLoading] = useState(true)
  const [availableTickets, setAvailableTickets] = useState(undefined)
  const [participants, setParticipants] = useState([])
  const [nonMembers, setNonMembers] = useState([])
  const [title, setTitle] = useState(undefined)

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(process.env.REACT_APP_API_URL + '/event/data/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (data.ok) {
        const dataJson = await data.json()
        setAvailableTickets(dataJson.availableTickets)
        setParticipants(
          dataJson.participants.map(
            ({ user: { _id, firstName, lastName, phoneNo, points, email }, date }) => ({
              key: _id,
              name: firstName + ' ' + lastName,
              phoneNo,
              points,
              email,
              date: new Date(date).toLocaleString(),
            })
          )
        )
        setNonMembers(
          dataJson.nonMembers.map(({ _id, name, phone, year, email, date }) => ({
            key: _id,
            name,
            phone,
            year,
            email,
            date: new Date(date).toLocaleString(),
          }))
        )
        setTitle(dataJson.title)
      }
      setLoading(false)
    }
    getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Spin spinning={loading}>
      <div className='body'>
        <h1 className='title'>{title}</h1>
        {availableTickets && (
          <>
            <h1 className='sub-title'>Attendence</h1>
            <Progress
              type='circle'
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={parseInt(
                ((participants.length + nonMembers.length) / availableTickets) * 100
              )}
              style={{ marginBottom: 20 }}
            />
          </>
        )}
        <h1 className='sub-title'>Members</h1>
        {availableTickets && (
          <Table className='table' columns={membersColmouns} dataSource={participants} bordered />
        )}
        <h1 className='sub-title'>Non Members</h1>
        {availableTickets && (
          <Table className='table' columns={nonMembersColmouns} dataSource={nonMembers} bordered />
        )}
        <Suspense fallback={<div>loading..</div>}>
          <ExportExcel
            members={participants}
            membersCol={membersColmouns}
            nonMembers={nonMembers}
            nonMembersCol={nonMembersColmouns}
          />
        </Suspense>
      </div>
    </Spin>
  )
}

export default EventStatistics
