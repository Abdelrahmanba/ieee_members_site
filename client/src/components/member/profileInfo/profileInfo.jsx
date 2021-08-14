import './profileInfo.scss'

import { Descriptions } from 'antd'

const ProfileInfoBox = ({ user }) => {
  return (
    <div className='profile__info profile__box'>
      <Descriptions
        colomn={{ xs: 1, sm: 1, md: 1 }}
        labelStyle={{
          color: '#0275A9',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
        contentStyle={{
          fontWeight: 'bold',
          fontSize: '16px',
        }}
        title={<h2>Member Info</h2>}
      >
        <Descriptions.Item label='Membership ID'>
          {user.membershipID ? user.membershipID : 'Not Provided'}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
        <Descriptions.Item label='Birthday'>
          {user.bday ? new Date(user.bday).toLocaleDateString() : 'Not Provided'}
        </Descriptions.Item>
        <Descriptions.Item label='Position'>
          {user.position ? user.position : 'Not Provided'}
        </Descriptions.Item>
        <Descriptions.Item label='Points'>
          <p>{user.points}</p>
        </Descriptions.Item>
        <Descriptions.Item label='Gender'>
          <p>
            {user.gender === 'm' && 'Male'}
            {user.gender === 'f' && 'Female'}
            {!user.gender && 'Not specified'}
          </p>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default ProfileInfoBox
