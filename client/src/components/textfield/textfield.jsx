import "./textfield.styles.scss"

const Textfield = ({ name, text, type, onChange, autocomplete }) => (
  <div className="textfield">
    <label className="textfield-label">{text}</label>
    <input
      autoComplete={autocomplete}
      onChange={onChange}
      type={type}
      className="textfield-input"
      name={name}
    ></input>
  </div>
)

export default Textfield
