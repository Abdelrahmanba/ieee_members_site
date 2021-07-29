import { Image, Avatar, Spin } from 'antd'
import './profile.styles.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import ProfileBox from '../../components/user/profileBox/profileBox'
import ProfileInfoBox from '../../components/user/profileInfo/profileInfo'
import { useParams } from 'react-router-dom'
import { signOut } from '../../redux/userSlice'

const spinner = <LoadingOutlined style={{ fontSize: 45 }} spin />

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  const token = useSelector((state) => state.user.token)
  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + '/user/' + (id ? id : 'me'), {
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      })
      if (res.ok) {
        const resJson = await res.json()
        setUser(resJson)
      } else if (res.status === 401) {
        dispatch(signOut)
      }
      setLoading(false)
    }
    fetchData()
  }, [token, id]) //eslint-disable-line

  return (
    <>
      <Spin spinning={loading} indicator={spinner}>
        <div className='body profile'>
          {user.imageData ? (
            <Avatar
              src={<Image src={'data:image/png;base64,' + user.imageData} />}
              className='profile__picture'
            />
          ) : (
            <Avatar icon={<UserOutlined />} className='profile__picture' />
          )}

          <h1 className='profile__name'>{!loading ? user.firstName + ' ' + user.lastName : ''}</h1>
          <div className='profile__container'>
            <ProfileInfoBox user={user} />
            <ProfileBox
              token={token}
              title='Events I Particepated In:'
              url={'/users/eventsParticipated/' + (id ? id : '')}
            />
            <ProfileBox
              token={token}
              title='Points History:'
              url={'/users/pointsHistory/' + (id ? id : '')}
            />
          </div>
        </div>
      </Spin>
    </>
  )
}

export default Profile
