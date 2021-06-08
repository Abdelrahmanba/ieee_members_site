import "./button.styles.scss"

const Button = ({ text, inverted, onClick }) => (
  <button
    onClick={onClick}
    className={`btn ${inverted ? "btn--inverted" : ""}`}
  >
    {text}
  </button>
)

export default Button
