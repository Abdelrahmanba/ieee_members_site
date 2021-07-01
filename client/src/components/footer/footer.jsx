import "./footer.styles.scss"
import {
  LinkedinFilled,
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled,
  YoutubeFilled,
  PhoneFilled,
  MailFilled,
  BankFilled,
} from "@ant-design/icons"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-row">
        <ul className="contact">
          <h1 className="title">Contact</h1>

          <li>
            <BankFilled className="contact-icon" />
            An-Najah National Uni - Nablus, Palestine
          </li>
          <li>
            <MailFilled className="contact-icon" />
            ieee@stu.najah.edu
          </li>
          <li>
            <PhoneFilled className="contact-icon" />
            +970597292545
          </li>
        </ul>
      </div>
      <div className="footer-row">
        <h1 className="title">Stay Updated</h1>

        <a href="https://www.facebook.com/ieeenajah" target="_blank">
          <FacebookFilled className="icons" />
        </a>
        <a
          href="https://www.linkedin.com/company/ieee-an-najah-student-branch"
          target="_blank"
        >
          <LinkedinFilled className="icons" />
        </a>
        <a href="https://twitter.com/IEEE_Najah" target="_blank">
          <TwitterCircleFilled className="icons" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCmBN1iProzSJVFVKeLUfPPQ"
          target="_blank"
        >
          <YoutubeFilled className="icons" />
        </a>
        <a href="https://www.instagram.com/ieee_nnu/" target="_blank">
          <InstagramFilled className="icons" />
        </a>
      </div>
      <div className="footer-credit">
        IEEE An-Najah Student Branch - All Rights Reserved 2021{" "}
      </div>
      <div className="footer-credit">
        Coded by{" "}
        <a href="https://www.linkedin.com/in/abdelrahmanbaba/">
          Abdelrahman Baba{" "}
        </a>
      </div>
    </footer>
  )
}

export default Footer
