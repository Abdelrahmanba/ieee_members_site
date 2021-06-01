import React from "react"
import Header from "../../components/header/header"
import { Col, Row } from "antd"

import "typeface-lora"
import "typeface-josefin-sans"

const HomePage = () => (
  <Row>
    <Col
      xs={{ span: 22, offset: 1 }}
      md={{ span: 20, offset: 2 }}
      lg={{ span: 18, offset: 3 }}
    >
      <Header />
    </Col>
  </Row>
)

export default HomePage
