import './homeSection.styles.scss'
import { Section } from 'react-scroll-section'

const HomeSection = ({ children, titlePr, titleSc, inverted, desc, id }) => {
  return (
    <Section className={`${inverted ? 'inverted' : ''} home-section`} id={id}>
      {titlePr && (
        <h1 className='title-main'>
          {titlePr} <span>{titleSc}</span>
        </h1>
      )}
      {desc && <p>{desc}</p>}
      {children}
    </Section>
  )
}

export default HomeSection
