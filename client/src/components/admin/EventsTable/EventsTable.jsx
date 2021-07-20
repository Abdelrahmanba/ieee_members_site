import './eventsTable.styles.scss'

import { Table, Button, message, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AddEvent from '../addEvent/addevent'
import EditEvent from '../EditEvent/Editevent'

const EventsTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const history = useHistory()
  const [visible, setVisible] = useState(false)

  const [rerender, setRerender] = useState(false)

  const token = useSelector((state) => state.user.token)

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
      }
      setLoading(false)
    }
    fetchData()
  }, [rerender, visible])

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
      width: '20%',
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
          <div>
            <Button onClick={() => history.push('/admin/event/' + text.key)}>
              View Statistics
            </Button>
            <Button onClick={() => {}}>Edit Event</Button>
            <Button onClick={() => history.push('/event/' + text.key)}>View Event</Button>
          </div>
        )
      },
      width: '30%',
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
      <EditEvent visible={visible} setVisible={setVisible} />

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
        <Button
          onClick={EditEvent}
          loading={loading}
          icon={<EditOutlined />}
          disabled={selectedRowKeys.length > 1 || selectedRowKeys.length === 0}
        >
          Edit Event
        </Button>
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
