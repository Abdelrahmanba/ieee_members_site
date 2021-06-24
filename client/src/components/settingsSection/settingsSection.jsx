import "./settingsSection.styles.scss"

const SettingsSection = ({ title, children }) => {
  return (
    <div className="body__section">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

export default SettingsSection
