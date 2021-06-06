import React from "react"
import Header from "../../components/header/header"
import { Col, Row } from "antd"
import "./home.styles.scss"

import "typeface-lora"
import "typeface-josefin-sans"
import Hero from "../../components/heroSection/hero"

const HomePage = () => (
  <>
    <Header />
    <Row>
      <Hero />
    </Row>
  </>
)

export default HomePage
