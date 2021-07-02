import React from 'react'
import './hero.styles.scss'
import { Section } from 'react-scroll-section'
const Hero = () => (
  <Section className='hero'>
    <div className='hero-bg'></div>
    <div className='hero-body'>
      <h1 className='header-text'>
        <span className='highlight-container sub'>
          <span className='highlight noselect'>Welcome To</span>
        </span>
      </h1>
      <h1 className='header-text'>
        <span className='highlight-container'>
          <span className='highlight highlight-1 noselect'>
            IEEE An-Najah National University Student Branch
          </span>
        </span>
      </h1>
      <h2 className='header-text'>
        <span className='highlight-container sub'>
          <span className='highlight highlight-2 noselect'>
            Participate in our events and be part of our community.
          </span>
        </span>
      </h2>
    </div>
  </Section>
)

export default Hero
