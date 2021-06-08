import "./form.styles.scss"

const Form = ({ method, children }) => (
  <form className="form" method={method}>
    {children}
  </form>
)

export default Form
