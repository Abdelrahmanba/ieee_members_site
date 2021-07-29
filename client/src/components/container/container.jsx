import './container.styles.scss'

const Container = ({ children, fullWidth }) => {
  if (fullWidth) {
    return (
      <div className='container' style={{ width: '100%' }}>
        {children}
      </div>
    )
  }
  return (
    <div className='container' style={{}}>
      {children}
    </div>
  )
}

export default Container
