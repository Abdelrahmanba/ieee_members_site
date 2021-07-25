import { Button, Table, Divider } from 'antd'
import './pointsTable.scss'
import { getColumnSearchProps } from '../../helpersFunctions'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { editModal, viewModal } from './adminPointsModals/adminPointsModal'
import React from 'react'
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
  }, [recordEdit])

  useEffect(() => {
    if (!recordView) {
      return
    }
    viewModal(recordView, setRecordView, token)
  }, [recordView])

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + '/users/all/points', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      const resJosn = await res.json()
      if (res.ok) {
        setUsers(
          resJosn.map(
            ({ _id, firstName, lastName, email, membershipID, points, pointsHistory }) => ({
              key: _id,
              name: firstName + ' ' + lastName,
              email,
              membershipID,
              points,
              pointsHistory,
            })
          )
        )
      }
      setLoading(false)
    }
    fetchData()
  }, [reload])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      fixed: 'left',
      sorter: (a, b) => {
        return a.name > b.name
      },
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      fixed: 'left',
      width: '25%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Member ID',
      dataIndex: 'membershipID',
      width: 160,
      ...getColumnSearchProps('membershipID'),
    },

    {
      title: 'Points',
      dataIndex: 'points',
    },

    {
      title: 'Action',
      key: 'action',

      render: function (text, record) {
        return (
          <div>
            <Button
              type='link'
              onClick={() => {
                setRecordEdit(record)
              }}
            >
              Edit
            </Button>
            <Divider type='vertical' />

            <Button
              type='link'
              onClick={() => {
                setRecordView(record)
              }}
            >
              View
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <Table
      className='table'
      columns={columns}
      dataSource={users}
      bordered
      loading={{ spinning: loading, indicator: antIcon }}
    />
  )
}

export default PointsTable
