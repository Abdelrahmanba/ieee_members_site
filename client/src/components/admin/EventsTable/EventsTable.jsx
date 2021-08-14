import './eventsTable.styles.scss'

import { Table, Button, message, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AddEvent from '../addEvent/addevent'
import { get, post } from '../../../utils/apiCall'
import getColumns from '../../../utils/eventsTableColumns'

const EventsTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [rerender, setRerender] = useState(false)
  const token = useSelector((state) => state.user.token)
  const columns = getColumns(history)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await get('/event/', token)
      if (res.ok) {
        const resJosn = await res.json()
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
      } else {
        message.error('Something Wrong.')
      }
      setLoading(false)
    }
    fetchData()
  }, [rerender, visible]) // eslint-disable-line react-hooks/exhaustive-deps

  const deleteEvent = async () => {
    setLoading(true)
    const res = await post('/event/deleteEvents', token, selectedRowKeys)
    if (res.ok) {
      message.success(`${selectedRowKeys.length} events were deleted Successfully`)
    } else {
      message.error('Something Went Wrong')
    }
    setSelectedRowKeys([])
    setLoading(false)
    setRerender((rerender) => !rerender)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }

  return (
    <>
      <AddEvent visible={visible} setVisible={setVisible} />
      <div className='btn-grp'>
        <Button
          type='primary'
          onClick={() => setVisible(true)}
          loading={loading}
          icon={<PlusOutlined />}
        >
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
