import { Divider } from 'antd'

const AboutSection = ({ title, body }) => (
  <>
    <Divider className='divider-text' data-aos='fade-up'>
      {title}
    </Divider>
    <p data-aos='fade-up' className='main-text' dangerouslySetInnerHTML={{ __html: body }}></p>
  </>
)

export default AboutSection
