import { Button, message } from 'antd'
import { List } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get, post } from '../../../utils/apiCall'
import Form from '../../form/form'
import Textfield from '../../textfield/textfield'

const PointsList = ({ type, editable }) => {
  const [data, setData] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [rerender, setRerender] = useState(false)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  const token = useSelector((state) => state.user.token)
  useEffect(() => {
    const fetchDate = async () => {
      const res = await get('/points/' + type, token)
      if (res.ok) {
        const resJson = await res.json()
        setData(resJson)
      } else {
        message.error('Something Went Wrong.')
      }
    }
    fetchDate()
  }, [rerender])

  const add = async () => {
    const res = await post('/points/', token, { title, amount, type })
    if (res.ok) {
      message.success('Added Successfully')
      setRerender((rerender) => !rerender)
    } else {
      message.error('Something Went Wrong!')
    }
    setVisible(false)
    setConfirmLoading(false)
  }

  const remove = async (id) => {
    const res = await get('/points/delete?id=' + id, token, { title, amount, type })
    if (res.ok) {
      message.success('Added Successfully')
      setRerender((rerender) => !rerender)
    } else {
      message.error('Something Went Wrong!')
    }
  }

  return (
    <>
      {editable && (
        <Modal
          title='Add Criterion'
          visible={visible}
          onOk={add}
          confirmLoading={confirmLoading}
          onCancel={() => setVisible(false)}
        >
          <Form>
            <Textfield text='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textfield text='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Form>
        </Modal>
      )}
      {type === 'committee' && !editable && (
        <h1 className='admin-title'>Committee Points Criteria</h1>
      )}
      {editable && (
        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end' }}>
          {type === 'committee' ? (
            <Button type='primary' style={{ textAlign: 'left' }} onClick={() => setVisible(true)}>
              Add Committe Criterion
            </Button>
          ) : (
            <Button type='primary' style={{ textAlign: 'left' }} onClick={() => setVisible(true)}>
              Add Members Criterion
            </Button>
          )}
        </div>
      )}
      <List
        size='large'
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {`[${item.amount} Points]     ${item.title}`}
            {editable && (
              <Button type='link' id={item._id} onClick={() => remove(item._id)}>
                Remove
              </Button>
            )}
          </List.Item>
        )}
        className='list'
        style={{ marginBottom: 30 }}
      />
    </>
  )
}

export default PointsList
