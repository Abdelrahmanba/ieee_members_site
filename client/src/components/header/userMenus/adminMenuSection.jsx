import HeaderItem from '../header-item/headerItem'
import './userMenuSections.scss'
import { Space, Tooltip } from 'antd'
import {
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
  ExportOutlined,
  UserSwitchOutlined,
  TrophyOutlined,
} from '@ant-design/icons'

const AdminMenuSections = ({ visible }) => {
  return (
    <>
      <ul className={`header__menu header__user__menu ${visible ? 'header__menu--visible' : ''}`}>
        <Space size={35}>
          <HeaderItem
            location={'/Admin/Home'}
            text={
              <Tooltip placement='bottom' title={'Home'}>
                <HomeOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
          />
          <HeaderItem
            location={'/Admin/Events'}
            text={
              <Tooltip placement='bottom' title={'Events'}>
                <CalendarOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
          />
          <HeaderItem
            location={'/Member/Members'}
            text={
              <Tooltip placement='bottom' title={'Members'}>
                <TeamOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
          />
          <HeaderItem
            location={'/Member/Points'}
            text={
              <Tooltip placement='bottom' title={'Points'}>
                <TrophyOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
          />
        </Space>
      </ul>
      <ul className='header__menu header__user__menu header__menu--user'>
        <Space size={20}>
          <HeaderItem
            location={'/Member/profile'}
            text={
              <Tooltip placement='bottom' title={'Switch To User Panel'}>
                <UserSwitchOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
          />
          <HeaderItem
            location={'/Member/settings'}
            text={
              <Tooltip placement='bottom' title={'Settings'}>
                <SettingOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
          />
          <HeaderItem
            location={'/signout'}
            text={
              <Tooltip placement='bottom' title={'Log Out'}>
                <ExportOutlined style={{ fontSize: '24px' }} />
              </Tooltip>
            }
            extraClass={'menu-list user-list'}
          />
        </Space>
      </ul>
    </>
  )
}

export default AdminMenuSections
