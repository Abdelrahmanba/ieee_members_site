import './textfield.styles.scss'

const Textfield = ({ name, text, type, onChange, autocomplete, children, ...props }) => (
  <div className='textfield'>
    <label className='textfield-label'>{text}</label>
    <input
      autoComplete={autocomplete}
      onChange={onChange}
      type={type}
      name={name}
      className='textfield-input'
      {...props}
    >
      {children}
    </input>
  </div>
)

export default Textfield
