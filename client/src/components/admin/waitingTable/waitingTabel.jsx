import './waitingTable.styles.scss'
import { Table, Button, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Textfield from '../../textfield/textfield'
import Form from '../../form/form'
import { LoadingOutlined } from '@ant-design/icons'
import { signOut } from '../../../redux/userSlice'
import { get } from '../../../utils/apiCall'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const WaitingTable = () => {
  const token = useSelector((state) => state.user.token)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [membershipID, setMembershipID] = useState('')

  const dispatch = useDispatch()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: function (text, record) {
        return <Button onClick={handleAccept.bind(null, null, text)}>Accept Member</Button>
      },
      width: '20%',
    },
  ]

  const handleAccept = (e, text) => {
    setUser(text)
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const handleOk = async () => {
    setConfirmLoading(true)
    const res = await get('/users/committeeAuth/' + user._id + '/' + membershipID, token)
    if (res.ok) {
      setUsers((users) => users.filter((item) => item._id !== user._id))
    }
    setConfirmLoading(false)

    setVisible(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await get('/users/committeeAuth', token)
      if (res.ok) {
        const resJosn = await res.json()
        setUsers(
          resJosn.map(({ email, firstName, lastName, _id }, index) => ({
            key: index,
            name: firstName + ' ' + lastName,
            email,
            _id,
          }))
        )
      } else if (res.status === 401) {
        dispatch(signOut)
      }
      setLoading(false)
    }
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className='admin-section'>
        <Modal
          title={`Accept ${user.name}`}
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form>
            <p className='modal-text'>Please Provide Membership ID for {user.name}.</p>
            <Textfield
              text='Membership ID'
              name='membershipID'
              type='text'
              onChange={(e) => setMembershipID(e.target.value)}
            />
          </Form>
        </Modal>
        <h1 className='admin-title'>Waiting Members</h1>
        <Table
          columns={columns}
          dataSource={users}
          className='table'
          bordered
          loading={{ indicator: antIcon, spinning: loading }}
        />
      </div>
    </>
  )
}

export default WaitingTable
