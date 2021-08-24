import './form.styles.scss'

const Form = ({ method, children, className, ...props }) => (
  <form className={`form ${className}`} method={method} {...props}>
    {children}
  </form>
)

export default Form
