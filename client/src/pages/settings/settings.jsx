import Header from "../../components/header/emptyHeader"
import UserHeaderSections from "../../components/header/userMenus/userMenuSections"
import { Image, Spin, message, Avatar, Button } from "antd"
import { LoadingOutlined ,CloudUploadOutlined} from "@ant-design/icons"

import ProfilePicture from "@dsalvagni/react-profile-picture"
import "@dsalvagni/react-profile-picture/dist/ProfilePicture.css"

import "./settings.styles.scss"
import React from "react"
import { connect } from "react-redux"

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

    const res = await fetch("http://localhost:3000/users/uploadAvatar", {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ image: imageAsDataURL }),
    })
    const resJson = await res.json()
  }

  render() {
    return (
      <>
        <Header>
          <UserHeaderSections />
        </Header>
        <Spin spinning={this.state.loading} indicator={spinner}>
          <div className="body">
            <div className="body__section">
              <h2>Avatar</h2>
              <ProfilePicture
                ref={this.profilePictureRef}
                frameFormat="circle"
                onImageLoaded={() =>
                  this.setState(() => ({ imageLoaded: true }))
                }
                onImageRemoved={() =>
                  this.setState(() => ({ imageLoaded: false }))
                }
                messages={{
                  DEFAULT: <CloudUploadOutlined style={{fontSize: "40px",color:"#0275a9"}} />,
                }}
              />
              <Button
                type={"primary"}
                onClick={this.handleUpload}
                disabled={!this.state.imageLoaded}
              >
                Update Profile Picture
              </Button>
            </div>
            <div className="seperator"></div>
          </div>
        </Spin>
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
})
export default connect(mapStateToProps)(Settings)
