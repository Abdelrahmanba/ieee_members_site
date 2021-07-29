import './eventsTable.styles.scss'

import { Table, Button, message, Popconfirm, Divider } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AddEvent from '../addEvent/addevent'
import { signOut } from '../../../redux/userSlice'

const EventsTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const history = useHistory()
  const [visible, setVisible] = useState(false)

  const [rerender, setRerender] = useState(false)

  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch(process.env.REACT_APP_API_URL + '/event/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      const resJosn = await res.json()
      if (res.ok) {
        setEvents(
          resJosn.map(
            ({ title, startDate, _id, availableTickets, participants, nonMembers }, index) => ({
              key: _id,
              title: title,
              seats: `${participants.length + nonMembers.length} / ${availableTickets} (${
                nonMembers.length
              } Non Members)`,
              date: new Date(startDate).toLocaleDateString(),
            })
          )
        )
      } else if (res.status === 401) {
        dispatch(signOut)
      }
      setLoading(false)
    }
    fetchData()
  }, [rerender, visible]) // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => {
        return new Date(a.date) - new Date(b.date)
      },
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
      width: '20%',
    },
    {
      title: 'Action',
      key: 'action',
      render: function (text, record) {
        return (
          <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <Button type='link' onClick={() => history.push('/admin/event/Statistics/' + text.key)}>
              Statistics
            </Button>
            <Divider type='vertical' />
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => history.push('/Admin/EditEvent/' + text.key)}
            >
              Edit
            </Button>
            <Divider type='vertical' />
            <Button type='link' onClick={() => history.push('/event/' + text.key)}>
              View
            </Button>
          </div>
        )
      },
      width: '35%',
    },
  ]

  const deleteEvent = async () => {
    setLoading(true)
    const res = await fetch(process.env.REACT_APP_API_URL + '/event/deleteEvents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(selectedRowKeys),
    })
    if (res.ok) {
      message.success(`${selectedRowKeys.length} events were deleted Successfully`)
    } else {
      message.error('Something Went Wrong')
    }
    setSelectedRowKeys([])
    setLoading(false)
    setRerender((rerender) => !rerender)
  }

  const addEvent = () => {
    setVisible(true)
  }

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,

    onChange: onSelectChange,
  }

  return (
    <>
      <AddEvent visible={visible} setVisible={setVisible} />
      <div className='btn-grp'>
        <Button type='primary' onClick={addEvent} loading={loading} icon={<PlusOutlined />}>
          Add Event
        </Button>
        <Popconfirm
          title='Are you sure to delete the Selected Events?'
          onConfirm={deleteEvent}
          okText='Delete'
          okType='danger'
          cancelText='Cancel'
          placement='bottom'
        >
          <Button
            type='danger'
            disabled={!selectedRowKeys.length > 0}
            loading={loading}
            icon={<DeleteOutlined />}
          >
            Remove Selected
          </Button>
        </Popconfirm>
        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length > 0 ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        className='table'
        rowSelection={rowSelection}
        columns={columns}
        dataSource={events}
        bordered
      />
    </>
  )
}

export default EventsTable
