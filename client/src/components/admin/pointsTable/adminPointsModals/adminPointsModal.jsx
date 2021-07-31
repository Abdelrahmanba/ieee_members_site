import { Button, Modal, message, Typography, List, Divider } from 'antd'
import Textfield from '../../../textfield/textfield'
import Form from '../../../form/form'
import React from 'react'

export const viewModal = (record, setRecord) => {
  Modal.info({
    title: <h1 className='title-modal'>{record.name}</h1>,
    icon: null,
    afterClose: () => {
      setRecord(undefined)
      Modal.destroyAll()
    },
    content: (
      <div>
        <h1 className='sub-title'>Total Points: {record.points}</h1>
        <List
          header={<div>Points History</div>}
          bordered
          dataSource={record.pointsHistory.reverse()}
          pagination={{
            pageSize: 7,
          }}
          size='small'
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[{item.amount}]</Typography.Text>
              {'  ' + item.title}
            </List.Item>
          )}
        />
      </div>
    ),
  })
}

export const editModal = (record, setRecord, setReload, token) => {
  const addPoint = async () => {
    const res = await fetch(
      process.env.REACT_APP_API_URL + '/users/update-by-admin/' + record.key,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pointsHistory: { amount, title } }),
      }
    )
    if (res.ok) {
      const resJson = await res.json()
      message.success('Updated Successfully')
      setReload((reload) => !reload)
      record.points += parseInt(amount)
      record.pointsHistory = resJson
      modal.update((config) => ({
        ...config,
        title: createTitle(record),
        content: createContent(record),
      }))
    } else {
      message.error('Something Went Worng')
    }
  }
  let title,
    amount = ''
  const removeHistory = async (item) => {
    const res = await fetch(
      process.env.REACT_APP_API_URL + '/users/update-by-admin/' + record.key,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ removeHistory: item }),
      }
    )
    if (res.ok) {
      const resJson = await res.json()

      message.success('Removed Successfully')
      record.pointsHistory = resJson
      record.points -= item.amount
      modal.update((config) => ({
        ...config,
        title: createTitle(record),
        content: createContent(record),
      }))
    } else {
      message.error('Something Went Worng')
    }
  }
  const createTitle = (record) => (
    <React.Fragment>
      <h1 className='title-modal'>{record.name}</h1>{' '}
      <h1 className='sub-title'>Total Points: {record.points}</h1>
    </React.Fragment>
  )
  const createContent = (record) => (
    <div>
      <Form>
        <Divider>Credit Member</Divider>
        <Textfield
          text='Title'
          placeholder='Ex:10 points for participating in ...'
          name='title'
          onChange={(e) => (title = e.target.value)}
        />
        <Textfield text='Amount' name='amount' onChange={(e) => (amount = e.target.value)} />
        <Button type='primary' style={{ width: '90%' }} onClick={() => addPoint()}>
          Credit
        </Button>
      </Form>
      <Form>
        <Divider>Remove Credits</Divider>
        <List
          header={<div>Points History</div>}
          bordered
          style={{ width: '100%' }}
          dataSource={record.pointsHistory.reverse()}
          pagination={{
            pageSize: 7,
          }}
          size='small'
          renderItem={(item) => (
            <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography.Text mark>[{item.amount}]</Typography.Text>
              {'  ' + item.title}
              <Button type='link' onClick={() => removeHistory(item)}>
                Remove
              </Button>
            </List.Item>
          )}
        />
      </Form>
    </div>
  )

  const modal = Modal.info({
    title: createTitle(record),
    icon: null,
    afterClose: () => {
      setRecord(undefined)
      Modal.destroyAll()
    },

    content: createContent(record),
  })
}
