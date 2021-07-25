import './points.styles.scss'
import { List } from 'antd'
import UserCard from '../../components/userCard/userCard'
import { ReactComponent as Trophy } from '../../assets/trophy.svg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const Points = () => {
  const token = useSelector((state) => state.user.token)
  const [top3, setTop3] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + '/users/top3')
      if (res.ok) {
        const resJosn = await res.json()
        setTop3(resJosn)
      }
    }
    fetchData()
  }, [])
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]
  return (
    <>
      <div className='body'>
        <h1 className='header-text'>
          <span className='highlight-container'>
            <span className='highlight highlight-2 noselect'>Introducing Our Points System!</span>
          </span>
        </h1>
        <p className='typography'>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."
        </p>
        <h2 className='header-text'>
          <span className='highlight-container sub'>
            <span className='highlight highlight-2 noselect'>How Can I Get Points?</span>
          </span>
        </h2>
        <p className='typography'>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        </p>

        <List
          size='large'
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          className='list'
        />
        <section>
          <h2 className='header-text'>
            <span className='highlight-container sub'>
              <span className='highlight highlight-2 noselect'>Top 3 Members</span>
            </span>
          </h2>
          <div className='top3'>
            <Trophy className='trophy' />
            {top3.map((user, index) => (
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
        </section>
      </div>
    </>
  )
}

export default Points
