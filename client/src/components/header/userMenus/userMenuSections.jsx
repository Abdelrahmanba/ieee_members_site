import HeaderItem from '../header-item/headerItem'
import './userMenuSections.scss'
import { Space, Tooltip } from 'antd'
import {
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
  ExportOutlined,
  UserOutlined,
  TrophyOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'

const UserHeaderSections = ({ visible }) => {
  const role = useSelector((state) => state.user.user.role)
  return (
    <>
      <ul className={`header__menu header__user__menu ${visible ? 'header__menu--visible' : ''}`}>
        <Space size={35}>
          <HeaderItem
            location={'/Member/Home'}
            text={
              <Tooltip placement='bottom' title={'Home'}>
                <HomeOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          <HeaderItem
            location={'/Member/Events'}
            text={
              <Tooltip placement='bottom' title={'Events'}>
                <CalendarOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          <HeaderItem
            location={'/Member/Members'}
            text={
              <Tooltip placement='bottom' title={'Members'}>
                <TeamOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          <HeaderItem
            location={'/Member/Points'}
            text={
              <Tooltip placement='bottom' title={'Points'}>
                <TrophyOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
        </Space>
      </ul>
      <ul className='header__menu header__user__menu header__menu--user'>
        <Space size={20}>
          <HeaderItem
            location={'/Member/profile'}
            text={
              <Tooltip placement='bottom' title={'Profile'}>
                <UserOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          <HeaderItem
            location={'/Member/settings'}
            text={
              <Tooltip placement='bottom' title={'Settings'}>
                <SettingOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          <HeaderItem
            location={'/signout'}
            text={
              <Tooltip placement='bottom' title={'Log Out'}>
                <ExportOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          {role === 'admin' || role === 'committee' ? (
            <HeaderItem
              location={'/Admin/Home'}
              text={
                <Tooltip placement='bottom' title={'Switch To Admin Panel'}>
                  <UserSwitchOutlined style={{ fontSize: '24px' }} />
                </Tooltip>
              }
              extraClass={'menu-list user-list switch'}
              type='private'
            />
          ) : (
            ''
          )}
        </Space>
      </ul>
    </>
  )
}

export default UserHeaderSections
