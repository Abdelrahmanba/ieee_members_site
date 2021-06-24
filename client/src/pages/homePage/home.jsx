import React from "react"
import Hero from "../../components/heroSection/hero"
import PublicHeader from "../../components/header/publicHeader"
import HomeEvents from "../../components/homeEvents/homeEvents"

import "./home.styles.scss"

const HomePage = () => {
  return (
    <>
      <PublicHeader />
      <Hero />
      <HomeEvents />
    </>
  )
}

export default HomePage
