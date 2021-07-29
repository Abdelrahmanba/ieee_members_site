import './userSection.styles.scss'

const UserSection = ({ title, children }) => {
  return (
    <section className='user-section'>
      <h1>
        {title.substring(0, title.lastIndexOf(' ') + 1)}
        <span>{title.split(' ')[title.split(' ').length - 1]}</span>
      </h1>
      <div>{children}</div>
    </section>
  )
}

export default UserSection
