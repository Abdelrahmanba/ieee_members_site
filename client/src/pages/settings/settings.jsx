import Header from '../../components/header/emptyHeader'
import UserHeaderSections from '../../components/header/userMenus/userMenuSections'
import { Spin, Button, message } from 'antd'
import { LoadingOutlined, CloudUploadOutlined } from '@ant-design/icons'

import ProfilePicture from '@dsalvagni/react-profile-picture'
import '@dsalvagni/react-profile-picture/dist/ProfilePicture.css'

import './settings.styles.scss'
import React from 'react'
import SettingsSection from '../../components/settingsSection/settingsSection'
import SettingsField from '../../components/settingsField/settingsField'
import { connect } from 'react-redux'

const spinner = <LoadingOutlined style={{ fontSize: 45 }} spin />

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, imageLoaded: false }
    this.profilePictureRef = React.createRef()
  }

  handleUpload = async () => {
    const PP = this.profilePictureRef.current
    const imageAsDataURL = PP.getImageAsDataUrl()
    const key = 'upadateAvater'

    message.loading({ content: 'Uploading...', key })

    const res = await fetch('http://localhost:3000/users/uploadAvatar', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ image: imageAsDataURL }),
    })
    if (!res.ok) {
      message.error({ content: 'Somthing went worng :(', key })
    } else {
      message.success({ content: 'Avater Was Updated!', key })
    }
  }

  render() {
    const { user } = this.props
    return (
      <>
        <Header>
          <UserHeaderSections />
        </Header>
        <Spin spinning={this.state.loading} indicator={spinner}>
          <div className='body'>
            <SettingsSection title='Avatar'>
              <div>
                <ProfilePicture
                  ref={this.profilePictureRef}
                  frameFormat='circle'
                  onImageLoaded={() => this.setState(() => ({ imageLoaded: true }))}
                  onImageRemoved={() => this.setState(() => ({ imageLoaded: false }))}
                  messages={{
                    DEFAULT: <CloudUploadOutlined style={{ fontSize: '40px', color: '#0275a9' }} />,
                  }}
                />
                <Button
                  type={'primary'}
                  onClick={this.handleUpload}
                  disabled={!this.state.imageLoaded}
                  style={{ marginTop: 20 }}
                >
                  Update Profile Picture
                </Button>
              </div>
            </SettingsSection>
            <div className='seperator' />
            <SettingsSection title='Personal Info'>
              <SettingsField
                title='First Name: '
                data={user.firstName}
                name='firstName'
                type='text'
              />
              <SettingsField title='Last Name: ' data={user.lastName} name='lastName' type='text' />
              <SettingsField
                title='Phone Number: '
                data={user.phoneNo ? user.phoneNo : 'Not Provided'}
                name='phoneNo'
                type='number'
              />
              <SettingsField title='Email: ' data={user.email} name='email' type='text' />
              <SettingsField title='Password: ' data='********' name='password' type='password' />

              <SettingsField
                title='Birthday: '
                data={user.bday ? new Date(user.bday).toLocaleDateString() : 'Not Provided'}
                type='date'
                name='bday'
              />
              <SettingsField title='Gender: ' data={user.gender} name='gender' type='radio' />
            </SettingsSection>
          </div>
        </Spin>
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
})
export default connect(mapStateToProps)(Settings)
