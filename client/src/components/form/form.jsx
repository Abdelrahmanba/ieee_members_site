import "./form.styles.scss"

const Form = ({ method, children, className }) => (
  <form className={`form ${className}`} method={method}>
    {children}
  </form>
)

export default Form
