import { Button, Modal, Table, Tag, Switch, message, Tooltip, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Form from '../../form/form'
import Textfield from '../../textfield/textfield'
import './membertable.style.scss'
import { getColumnSearchProps } from '../../../helpersFunctions'
import { LoadingOutlined } from '@ant-design/icons'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const MembersTable = () => {
  const [users, setUsers] = useState([])
  const [loadingConfirm, setLoadingConfirm] = useState(false)
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)

  const [record, setRecord] = useState(undefined)

  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    if (!record) {
      return
    }
    let active,
      membershipID,
      position,
      role = undefined

    if (record.status === 'Active') {
      active = true
    } else {
      active = false
    }
    membershipID = record.membershipID
    position = record.position
    const modal = Modal.confirm({
      title: <h1 className='sub-title'>{record.name}</h1>,
      icon: null,
      okButtonProps: { loading: loadingConfirm },
      onOk: async () => {
        setLoadingConfirm(true)
        const res = await fetch(
          process.env.REACT_APP_API_URL + '/users/update-by-admin/' + record.key,
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ membershipID, active, position, role }),
          }
        )
        if (res.ok) {
          message.success('Updated Successfully')
          setReload((reload) => !reload)
        } else {
          message.error('Something Went Worng')
        }
        setLoadingConfirm(false)
      },
      afterClose: () => {
        setRecord(undefined)
      },

      content: (
        <Form>
          <Textfield
            type='text'
            name='membershipID'
            text='Membership ID'
            defaultValue={membershipID}
            onChange={(e) => (membershipID = e.target.value)}
          />
          <Textfield
            type='text'
            name='position'
            text='Position'
            defaultValue={position}
            onChange={(e) => {
              position = e.target.value
            }}
          />
          <div className='form-row'>
            <Tooltip placement='right' title='This Affects Permissions'>
              <label className='importent-role'>Role</label>
            </Tooltip>
            <Select style={{ width: 120 }} defaultValue={record.role} onChange={(e) => (role = e)}>
              <Select.Option value='admin'>Admin</Select.Option>
              <Select.Option value='committee'>Commttiee</Select.Option>
              <Select.Option value='user'>Member</Select.Option>
            </Select>
          </div>
          <div className='form-row'>
            <label>Active</label>
            <Switch defaultChecked={active} onChange={(e) => (active = e)} />
          </div>
        </Form>
      ),
    })
  }, [record])

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + '/users/all', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
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
              position,
              activeCommttiee,
              activeEmail,
              role,
            }) => ({
              key: _id,
              name: firstName + ' ' + lastName,
              email,
              membershipID,
              position,
              role,
              status:
                activeEmail && activeCommttiee
                  ? 'Active'
                  : !activeEmail
                  ? 'Pending Email'
                  : 'Pending Commttiee',
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
      fixed: 'left',
      width: 220,
      sorter: (a, b) => {
        return a.name > b.name
      },
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      fixed: 'left',
      width: 200,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Member ID',
      dataIndex: 'membershipID',
      width: 160,
      ...getColumnSearchProps('membershipID'),
    },

    {
      title: 'Position',
      dataIndex: 'position',
      ...getColumnSearchProps('position'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 130,
      filters: [
        {
          text: 'Active',
          value: 'Active',
        },
        {
          text: 'Pending Email',
          value: 'Pending Email',
        },
        {
          text: 'Pending Commttiee',
          value: 'Pending Commttiee',
        },
      ],
      onFilter: (value, record) => record.status.includes(value),

      render: (tag) => (
        <Tag
          color={tag === 'Active' ? 'green' : tag === 'Pending Email' ? 'geekblue' : 'orange'}
          key={tag}
        >
          {tag.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 50,

      render: function (text, record) {
        return (
          <div>
            <Button
              type='link'
              onClick={() => {
                setRecord(record)
              }}
            >
              Edit
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <h1 className='title' style={{ textAlign: 'left', width: '100%' }}>
        All Members
      </h1>
      <Table
        className='table'
        columns={columns}
        dataSource={users}
        bordered
        loading={{ spinning: loading, indicator: antIcon }}
      />
    </>
  )
}

export default MembersTable
