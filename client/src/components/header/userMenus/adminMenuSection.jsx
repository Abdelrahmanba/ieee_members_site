import HeaderItem from '../header-item/headerItem'
import './userMenuSections.scss'
import { Space, Tooltip } from 'antd'
import {
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
  ExportOutlined,
  UserSwitchOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'

const AdminMenuSections = ({ visible }) => {
  const role = useSelector((state) => state.user.user.role)
  const touchScreen = 'ontouchstart' in document.documentElement

  return (
    <>
      <ul className={`header__menu header__user__menu ${visible ? 'header__menu--visible' : ''}`}>
        <Space size={35}>
          <HeaderItem
            location={'/Admin/Home'}
            text={
              touchScreen ? (
                <HomeOutlined style={{ fontSize: '24px' }} />
              ) : (
                <Tooltip placement='bottom' title={'Home'}>
                  <HomeOutlined style={{ fontSize: '24px' }} />
                </Tooltip>
              )
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          <HeaderItem
            location={'/Admin/Events'}
            text={
              touchScreen ? (
                <CalendarOutlined style={{ fontSize: '24px' }} />
              ) : (
                <Tooltip placement='bottom' title={'Events'}>
                  <CalendarOutlined style={{ fontSize: '24px' }} />
                </Tooltip>
              )
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          {role === 'admin' && (
            <HeaderItem
              location={'/Admin/Users'}
              text={
                touchScreen ? (
                  <TeamOutlined style={{ fontSize: '24px' }} />
                ) : (
                  <Tooltip placement='bottom' title={'Members'}>
                    <TeamOutlined style={{ fontSize: '24px' }} />
                  </Tooltip>
                )
              }
              extraClass={'menu-list user-list'}
              type='private'
            />
          )}
          {role === 'admin' && (
            <HeaderItem
              location={'/Admin/Points'}
              text={
                touchScreen ? (
                  <TrophyOutlined style={{ fontSize: '24px' }} />
                ) : (
                  <Tooltip placement='bottom' title={'Points'}>
                    <TrophyOutlined style={{ fontSize: '24px' }} />
                  </Tooltip>
                )
              }
              extraClass={'menu-list user-list'}
              type='private'
            />
          )}
        </Space>
      </ul>
      <ul className='header__menu header__user__menu header__menu--user'>
        <Space size={20}>
          <HeaderItem
            location={'/Member/Home'}
            text={
              touchScreen ? (
                <UserSwitchOutlined style={{ fontSize: '24px' }} />
              ) : (
                <Tooltip placement='bottom' title={'Switch To User Panel'}>
                  <UserSwitchOutlined style={{ fontSize: '24px' }} />
                </Tooltip>
              )
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          <HeaderItem
            location={'/signout'}
            text={
              touchScreen ? (
                <ExportOutlined style={{ fontSize: '24px' }} />
              ) : (
                <Tooltip placement='bottom' title={'Log Out'}>
                  <ExportOutlined style={{ fontSize: '24px' }} />
                </Tooltip>
              )
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
        </Space>
      </ul>
    </>
  )
}

export default AdminMenuSections
