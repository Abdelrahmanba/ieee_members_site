import './society.styless.scss'
const Society = ({ title, children }) => {
  return (
    <section className='societies'>
      <h1 className='title'>{title}</h1>
      <p>{children}</p>
    </section>
  )
}

export default Society
