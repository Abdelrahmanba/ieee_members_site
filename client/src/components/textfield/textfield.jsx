import "./textfield.styles.scss"

const Textfield = ({ name, text, type, onChange }) => (
  <div className="textfield">
    <label className="textfield-label">{text}</label>
    <input
      onChange={onChange}
      type={type}
      className="textfield-input"
      name={name}
    ></input>
  </div>
)

export default Textfield
