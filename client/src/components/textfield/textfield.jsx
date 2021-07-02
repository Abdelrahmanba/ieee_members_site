import './textfield.styles.scss'

const Textfield = ({ name, text, type, onChange, autocomplete, children }) => (
  <div className='textfield'>
    <label className='textfield-label'>{text}</label>
    <input
      autoComplete={autocomplete}
      onChange={onChange}
      type={type}
      className='textfield-input'
      name={name}
    >
      {children}
    </input>
  </div>
)

export default Textfield
