import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Textfield from '../../textfield/textfield'
import { Mentions, Button, Tag, message } from 'antd'
import './addPoints.styles.scss'
import { signOut } from '../../../redux/userSlice'
import { get, post } from '../../../utils/apiCall'
const { Option } = Mentions

const AddPoints = ({ reload, setReload }) => {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState([])
  const [mentionValue, setMentionValue] = useState('')
  const [amount, setAmount] = useState('')
  const [title, setTitle] = useState('')
  const [prefix, setPrefix] = useState('')
  const [loading, setloading] = useState(false)

  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const res = await get('/users/all/', token)
      const resJosn = await res.json()
      if (res.ok) {
        setUsers(
          resJosn.map(({ _id, firstName, lastName, email, membershipID }) => ({
            _id: _id,
            name: firstName + ' ' + lastName,
            email,
            membershipID,
          }))
        )
      } else if (res.status === 401) {
        dispatch(signOut)
      } else {
        message.error('Something Went Wrong')
      }
    }
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const creditMembers = async () => {
    setloading(true)
    const res = await post('/users/addPoints/multi', token, { selected, amount, title })
    if (res.ok) {
      message.success('Added Successfuly')
      setReload((reload) => !reload)
    } else {
      message.error('Something Went Wrong!')
    }
    setloading(false)
  }
  return (
    <>
      <Textfield
        text='Title'
        placeholder='Ex:10 points for participating in ...'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textfield
        text='Amount'
        name='amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Mentions
        autoSize
        style={{ width: '90%' }}
        onSearch={(_, prefix) => setPrefix(prefix)}
        prefix={['$', '#']}
        value={mentionValue}
        filterOption={(t, e) => {
          return (
            e.children.toLowerCase().includes(t.toLowerCase()) &&
            !selected.find((v) => v.id === e.value)
          )
        }}
        onChange={(e) => setMentionValue(e)}
        placeholder='input $ to mention By Email, # to mention By Name'
        onSelect={(option) => {
          setMentionValue('')
          setSelected((selected) => selected.concat({ id: option.value, name: option.children }))
        }}
      >
        {prefix === '$'
          ? users.map((user, index) => (
              <Option value={user._id} key={index}>
                {user.email}
              </Option>
            ))
          : users.map((user, index) => (
              <Option value={user._id} key={index}>
                {user.name}
              </Option>
            ))}
      </Mentions>
      <div className='mentions'>
        {selected.map((v, index) => (
          <Tag
            className='tag'
            closable
            color='blue'
            key={index}
            value={v.id}
            onClose={(e) => {
              const value = e.currentTarget.parentNode.getAttribute('value')
              e.preventDefault()
              setSelected((selected) => selected.filter((v) => v.id !== value))
            }}
          >
            {v.name}
          </Tag>
        ))}
      </div>
      <Button
        type='primary'
        loading={loading}
        onClick={() => creditMembers()}
        style={{ width: '90%', marginBottom: 20 }}
      >
        Add Points
      </Button>
    </>
  )
}

export default AddPoints
