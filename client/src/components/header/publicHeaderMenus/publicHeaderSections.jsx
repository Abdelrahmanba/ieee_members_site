import HeaderItem from '../header-item/headerItem'
import './publicHeaderMenus.scss'
import { useScrollSection } from 'react-scroll-section'
const PublicHeaderSections = ({ visible, links }) => {
  const eventSection = useScrollSection('event')
  const aboutSection = useScrollSection('about')
  const achievemnetsSection = useScrollSection('achievemnets')
  const societiesSection = useScrollSection('societies')
  const teamSection = useScrollSection('team')

  return (
    <ul className={`header__menu ${visible ? 'header__menu--visible' : ''}`}>
      <HeaderItem
        location={'/#about'}
        text={'About'}
        extraClass={'menu-list'}
        onClick={aboutSection.onClick}
        selected={aboutSection.selected}
        links={links}
      />
      <HeaderItem
        location={'/#events'}
        text={'Events'}
        extraClass={'menu-list'}
        onClick={eventSection.onClick}
        selected={eventSection.selected}
        links={links}
      />
      <HeaderItem
        location={'/#achievemnets'}
        text={'Achievemnets'}
        extraClass={'menu-list'}
        onClick={achievemnetsSection.onClick}
        selected={achievemnetsSection.selected}
        links={links}
      />
      <HeaderItem
        location={'/#societies'}
        text={'Societies'}
        extraClass={'menu-list'}
        onClick={societiesSection.onClick}
        selected={societiesSection.selected}
        links={links}
      />
      <HeaderItem
        location={'/#team'}
        text={'Our Team'}
        extraClass={'menu-list'}
        onClick={teamSection.onClick}
        selected={teamSection.selected}
        links={links}
      />
    </ul>
  )
}

export default PublicHeaderSections
