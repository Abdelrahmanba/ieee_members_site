import { useEffect, useState } from 'react'
import { AutoComplete, Input, message, Pagination, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import MemberCard from '../memberCard/memberCard'
import { signOut } from '../../../redux/userSlice'
import { get } from '../../../utils/apiCall'
import { useDispatch } from 'react-redux'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Search } = Input

const AllMembersListing = ({ token }) => {
  const [open, setOpen] = useState(false)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(8)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      const usersFetch = await get('/users/all/members', token)
      if (usersFetch.ok) {
        const usersFetchJson = await usersFetch.json()
        setUsers(usersFetchJson)
        setLoading(false)
      } else {
        message.error('Something went wrong, please refresh the page..')
      }
      if (usersFetch.status === 401) {
        dispatch(signOut)
      }
    }
    fetchData()
  }, [token]) //eslint-disable-line react-hooks/exhaustive-deps

  const onSelect = (value) => {
    history.push('/member/profile/' + value)
  }
  const changePage = (page, pageSize) => {
    setSkip((page - 1) * pageSize)
    setLimit(pageSize)
  }

  return (
    <Spin indicator={antIcon} spinning={loading}>
      <div className='users__body'>
        <h1 className='user__title'>Our valued Members</h1>
        <AutoComplete
          options={users.map((u) => ({
            label: u.firstName + ' ' + u.lastName,
            key: u._id,
            value: u._id,
          }))}
          open={open}
          style={{ width: '100%', textAlign: 'center' }}
          onSelect={onSelect}
          notFoundContent='No Results'
          filterOption={(t, e) => {
            return e.label.toLowerCase().includes(t.toLowerCase())
          }}
        >
          <Search
            placeholder='Search Member'
            enterButton
            style={{ width: '80%', margin: '20px 0' }}
            onBlur={() => setOpen(false)}
            onChange={(e) => {
              if (e.target.value === '') {
                setOpen(false)
              } else setOpen(true)
            }}
          />
        </AutoComplete>
        {users
          .sort((a, b) => {
            if (b.position === 'Member') return -1
          })
          .filter((v, i) => i >= skip && i < limit + skip)
          .map((user, index) => (
            <MemberCard
              key={index}
              name={user.firstName + ' ' + user.lastName}
              position={user.position}
              fa
              points={user.points}
              avatar={user.imageData}
              id={user._id}
            />
          ))}
        <Pagination
          style={{ width: '100%', textAlign: 'center' }}
          defaultCurrent={1}
          total={users.length}
          onChange={changePage}
          pageSize={8}
          showSizeChanger={false}
        />
      </div>
    </Spin>
  )
}

export default AllMembersListing
