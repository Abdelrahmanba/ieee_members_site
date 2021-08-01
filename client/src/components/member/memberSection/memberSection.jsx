import './memberSection.styles.scss'

const MemberSection = ({ title, children }) => {
  return (
    <section className='user-section'>
      <h1>
        {title.substring(0, title.lastIndexOf(' ') + 1)}
        <span>{title.split(' ')[title.split(' ').length - 1]}</span>
      </h1>
      {children}
    </section>
  )
}

export default MemberSection
