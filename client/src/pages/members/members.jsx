import UserCard from '../../components/userCard/userCard'
import './members.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AutoComplete, Input, Pagination, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { signOut } from '../../redux/userSlice'
import UserSection from '../../components/userSection/userSection'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const { Search } = Input

const Members = () => {
  const token = useSelector((state) => state.user.token)
  const [users, setUsers] = useState([])
  const [committee, setCommittee] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(8)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const committeeFetch = await fetch(process.env.REACT_APP_API_URL + '/users/all/committee')
      if (committeeFetch.ok) {
        const committeeFetchJson = await committeeFetch.json()
        setCommittee(committeeFetchJson)
      }
      const usersFetch = await fetch(process.env.REACT_APP_API_URL + '/users/all/members', {
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      })
      if (usersFetch.ok) {
        const usersFetchJson = await usersFetch.json()
        setUsers(usersFetchJson)
      }

      if (usersFetch.status === 401) {
        dispatch(signOut)
      }
      setLoading(false)
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
    <>
      <div className='users__body'>
        <h1 className='user__title'>Our Enthusiastic Team</h1>
        {committee.map((user, index) => (
          <UserCard
            key={index}
            name={user.firstName + ' ' + user.lastName}
            position={user.position}
            points={user.points}
            avatar={user.imageData}
            id={user._id}
          />
        ))}
      </div>
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
            .filter((v, i) => i >= skip && i < limit + skip)
            .map((user, index) => (
              <UserCard
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
          />
        </div>
      </Spin>
    </>
  )
}

export default Members
