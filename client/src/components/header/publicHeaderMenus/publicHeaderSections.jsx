import HeaderItem from '../header-item/headerItem'
import './publicHeaderMenus.scss'
import { useScrollSection } from 'react-scroll-section'
const PublicHeaderSections = ({ visible }) => {
  const eventSection = useScrollSection('event')
  const aboutSection = useScrollSection('about')
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
      />
      <HeaderItem
        location={'/#events'}
        text={'Events'}
        extraClass={'menu-list'}
        onClick={eventSection.onClick}
        selected={eventSection.selected}
      />

      <HeaderItem
        location={'/#societies'}
        text={'Societies'}
        extraClass={'menu-list'}
        onClick={societiesSection.onClick}
        selected={societiesSection.selected}
      />
      <HeaderItem
        location={'/#team'}
        text={'Our Team'}
        extraClass={'menu-list'}
        onClick={teamSection.onClick}
        selected={teamSection.selected}
      />
    </ul>
  )
}

export default PublicHeaderSections
