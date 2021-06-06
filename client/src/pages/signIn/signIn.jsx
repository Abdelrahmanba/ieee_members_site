import "./signIn.styles.scss"
import Header from "../../components/header/header"
import Textfield from "../../components/textfield/textfield"

const SignIn = () => {
  return (
    <>
      <Header />
      <section className="sign-in">
        <div className="signin-box">
          <h1 className="signin-header">Sign In</h1>
          <p className="sign-in=paragraph"></p>
          <Textfield type="text" name="email" text="Email Address" />
          <Textfield type="password" name="password" text="Password" />
        </div>
      </section>
    </>
  )
}

export default SignIn
