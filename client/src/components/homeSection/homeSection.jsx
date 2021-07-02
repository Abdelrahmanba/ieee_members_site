import './homeSection.styles.scss'
import { Section } from 'react-scroll-section'

const HomeSection = ({ children, titlePr, titleSc, inverted, desc, id }) => {
  return (
    <Section className={`${inverted ? 'inverted' : ''} home-events`} id={id}>
      <h1 className='title'>
        {titlePr} <span>{titleSc}</span>
      </h1>
      <p>{desc}</p>
      {children}
    </Section>
  )
}

export default HomeSection
