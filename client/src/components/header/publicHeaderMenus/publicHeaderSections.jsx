import HeaderItem from '../header-item/headerItem'
import './publicHeaderMenus.scss'
import React from 'react'
import { Events } from 'react-scroll'

class PublicHeaderSections extends React.Component {
  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }
  render() {
    return (
      <ul className={`header__menu ${this.props.visible ? 'header__menu--visible' : ''}`}>
        <HeaderItem location={'about'} text={'About'} extraClass={'menu-list'} />
        <HeaderItem location={'events'} text={'Events'} extraClass={'menu-list'} />
        <HeaderItem location={'team'} text={'Our Team'} extraClass={'menu-list'} />
        <HeaderItem location={'societies'} text={'Societies'} extraClass={'menu-list'} />
      </ul>
    )
  }
}

export default PublicHeaderSections
