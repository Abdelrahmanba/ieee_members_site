import './society.styless.scss'
const Society = ({ children, type, logo, id }) => {
  return (
    <section id={id} className={`societies ${type}`}>
      <img className='logo' src={logo} />
      {children}
      {type !== 'blackhole' && <div className='bannar' />}
    </section>
  )
}

export default Society
