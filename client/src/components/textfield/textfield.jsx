import "./textfield.styles.scss"

const Textfield = ({ name, text, type }) => (
  <div className="textfield">
    <label className="textfield-label">{text}</label>
    <input type={type} className="textfield-input" name={name}></input>
  </div>
)

export default Textfield
