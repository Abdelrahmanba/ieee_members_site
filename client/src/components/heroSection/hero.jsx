import React from "react"
import "./hero.styles.scss"
import { Carousel } from "antd"

const Hero = () => (
  <div className="hero">
    <div className="hero-bg"></div>
    <div className="hero-body">
      <h1 className="header-text">
        <span class="highlight-container sub">
          <span class="highlight">Welcome To</span>
        </span>
      </h1>
      <h1 className="header-text">
        <span class="highlight-container">
          <span class="highlight highlight-1">
            IEEE An-Najah National University Student Branch
          </span>
        </span>
      </h1>
      <h2 className="header-text">
        <span class="highlight-container sub">
          <span class="highlight highlight-2">
            Participate in our events and be part of our community.
          </span>
        </span>
      </h2>
    </div>
    <a href="#section06">
      <span className="arrow"></span>Learn More
    </a>
  </div>
)

export default Hero
