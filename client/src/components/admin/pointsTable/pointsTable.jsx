import { Table } from 'antd'
import './pointsTable.scss'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { editModal, viewModal } from './adminPointsModals/adminPointsModal'
import React from 'react'
import { get } from '../../../utils/apiCall'
import getColumns from '../../../utils/pointsTableColoums'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const PointsTable = ({ reload, setReload }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [recordView, setRecordView] = useState(undefined)
  const [recordEdit, setRecordEdit] = useState(undefined)

  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    if (!recordEdit) {
      return
    }
    editModal(recordEdit, setRecordEdit, setReload, token)
  }, [recordEdit]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!recordView) {
      return
    }
    viewModal(recordView, setRecordView, token)
  }, [recordView]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const res = await get('/users/all/points', token)
      const resJosn = await res.json()
      if (res.ok) {
        setUsers(
          resJosn.map(
            ({
              _id,
              firstName,
              lastName,
              email,
              membershipID,
              points,
              pointsHistory,
              committeePoints,
            }) => ({
              key: _id,
              name: firstName + ' ' + lastName,
              email,
              membershipID,
              points,
              cpoints: committeePoints,
              pointsHistory,
            })
          )
        )
      }
      setLoading(false)
    }
    fetchData()
  }, [reload]) // eslint-disable-line react-hooks/exhaustive-deps
  const columns = getColumns(setRecordEdit, setRecordView)

  return (
    <Table
      className='table'
      columns={columns}
      dataSource={users}
      bordered
      scroll={{ x: 950 }}
      loading={{ spinning: loading, indicator: antIcon }}
    />
  )
}

export default PointsTable
