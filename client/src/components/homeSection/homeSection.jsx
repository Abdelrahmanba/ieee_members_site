import "./homeSection.styles.scss"

const HomeSection = ({ children, titlePr, titleSc, inverted, desc }) => {
  return (
    <section className={`${inverted ? "inverted" : ""} home-events`}>
      <h1 className="title">
        {titlePr} <span>{titleSc}</span>
      </h1>
      <p>{desc}</p>
      {children}
    </section>
  )
}

export default HomeSection
