import { Popconfirm, Table, Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get, post } from '../../../utils/apiCall'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import getColumns from '../../../utils/announcementsTableColumns'
import { useHistory } from 'react-router-dom'
import AddAnnouncement from '../addAnnouncement/addAnnounement'

const AnnouncementsTable = () => {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [rerender, setRerender] = useState(false)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const history = useHistory()
  const columns = getColumns(history)
  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    const fetchData = async () => {
      const res = await get('/announcement', token)
      if (res.ok) {
        const resJson = await res.json()
        setAnnouncements(
          resJson.announcements.map(({ date, title, _id }) => ({ date, title, key: _id }))
        )
        setLoading(false)
      } else {
        message.error('Something Went Wrong.')
      }
    }
    fetchData()
  }, [rerender, visible, token])

  const deleteAnnouncement = async () => {
    setLoading(true)
    const res = await post('/announcement/deleteAnnouncements', token, selectedRowKeys)
    if (res.ok) {
      message.success(`${selectedRowKeys.length} announcements were deleted Successfully`)
    } else {
      message.error('Something Went Wrong')
    }
    setSelectedRowKeys([])
    setRerender((rerender) => !rerender)
    setLoading(false)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }
  return (
    <>
      <h1 className='admin-title'>Announcements</h1>
      <AddAnnouncement visible={visible} setVisible={setVisible} />
      <div className='btn-grp'>
        <Button
          type='primary'
          onClick={() => setVisible(true)}
          loading={loading}
          icon={<PlusOutlined />}
        >
          Add Announcement
        </Button>
        <Popconfirm
          title='Are you sure to remove the Selected Announcement?'
          onConfirm={deleteAnnouncement}
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
            Remove Announcement
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
        dataSource={announcements}
        bordered
        style={{ marginBottom: 20 }}
      />
    </>
  )
}

export default AnnouncementsTable
