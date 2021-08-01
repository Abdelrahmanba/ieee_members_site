import { Element } from 'react-scroll'
import './homeSection.styles.scss'

const HomeSection = ({ children, titlePr, titleSc, inverted, desc, name }) => {
  return (
    <Element className={`${inverted ? 'inverted' : ''} home-section`} name={name}>
      {titlePr && (
        <h1 className='title-main'>
          {titlePr} <span>{titleSc}</span>
        </h1>
      )}
      {desc && <p>{desc}</p>}
      {children}
    </Element>
  )
}

export default HomeSection
