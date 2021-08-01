import { Modal, Table, Switch, message, Tooltip, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Form from '../../form/form'
import Textfield from '../../textfield/textfield'
import './membertable.style.scss'
import { get, post } from '../../../utils/apiCall'
import { LoadingOutlined } from '@ant-design/icons'
import getColumns from '../../../utils/memberTableColumns'

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
    let { activeEmail, activeCommttiee, membershipID, position, email } = record
    let role = undefined

    Modal.confirm({
      title: <h1 className='sub-title'>{record.name}</h1>,
      icon: null,
      okButtonProps: { loading: loadingConfirm },
      onOk: async () => {
        setLoadingConfirm(true)
        const res = await post('/users/update-by-admin/' + record.key, token, {
          membershipID,
          activeEmail,
          activeCommttiee,
          position,
          role,
          email,
        })
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
            name='email'
            text='Email'
            defaultValue={email}
            onChange={(e) => (email = e.target.value)}
          />
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
            <label>Active (Approved)</label>
            <Switch defaultChecked={activeCommttiee} onChange={(e) => (activeCommttiee = e)} />
          </div>
          <div className='form-row'>
            <label>Active Email</label>
            <Switch defaultChecked={activeEmail} onChange={(e) => (activeEmail = e)} />
          </div>
        </Form>
      ),
    })
  }, [record]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const res = await get('/users/all', token)
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
              activeEmail,
              activeCommttiee,
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
  }, [reload]) // eslint-disable-line react-hooks/exhaustive-deps

  const columns = getColumns(setRecord)

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
