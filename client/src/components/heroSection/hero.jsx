import React from "react"
import "./hero.styles.scss"

const Hero = () => (
  <div className="hero">
    <div className="hero-bg"></div>
    <div className="hero-body">
      <h1 className="header-text">
        <span className="highlight-container sub">
          <span className="highlight">Welcome To</span>
        </span>
      </h1>
      <h1 className="header-text">
        <span className="highlight-container">
          <span className="highlight highlight-1">
            IEEE An-Najah National University Student Branch
          </span>
        </span>
      </h1>
      <h2 className="header-text">
        <span className="highlight-container sub">
          <span className="highlight highlight-2">
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
