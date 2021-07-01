import { useSelector } from "react-redux"
import "./event.styles.scss"
import PublicHeader from "../../components/header/publicHeader"
import Header from "../../components/header/emptyHeader"
import UserHeaderSections from "../../components/header/userMenus/userMenuSections"
import { Modal, Button } from "antd"
import { useState } from "react"
const Event = () => {
  const token = useSelector((state) => state.user.token)
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleOk = async () => {
    setConfirmLoading(true)
    setTimeout(() => {}, 2000)
    setVisible(false)
    setConfirmLoading(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const showModal = () => {
    setVisible(true)
  }
  return (
    <>
      {token ? (
        <Header>
          <UserHeaderSections />
        </Header>
      ) : (
        <PublicHeader />
      )}
      <div className="body event">
        <Modal
          title="Confirm Registration"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>
            Are you sure you want to attend {}?, also please note you need to
            pay for the event before {} to confirm your registration{" "}
          </p>
        </Modal>
        <h1 className="title">Lorem Ipson</h1>
        <img src="https://branch.ieee-annu.com/wp-content/uploads/2021/04/174199218_3947661548612760_4824108478649130793_n.jpg" />
        <Button type="primary" onClick={showModal}>
          Join This Event!
        </Button>
      </div>
    </>
  )
}

export default Event
