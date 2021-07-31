import React, { useState } from 'react'
import Hero from '../../components/home/heroSection/hero'
import HomeSection from '../../components/home/homeSection/homeSection'
import Container from '../../components/container/container'
import Footer from '../../components/footer/footer'

import { ScrollingProvider } from 'react-scroll-section'
import computerLogo from '../../assets/socities/computer_logo.png'
import rasLogo from '../../assets/socities/robotcs_logo.png'
import pesLogo from '../../assets/socities/pes_logo.png'
import wieLogo from '../../assets/socities/woman_logo.png'
import blackHole from '../../assets/blackHole_logo.png'
import './home.styles.scss'
import PublicHeader from '../../components/header/publicHeader'
import EventList from '../../components/event/eventList/eventList'
import { Button, Divider } from 'antd'
import Society from '../../components/society/sociey'

import contents from '../../assets/contents'
import Achivments from '../../components/home/achivemnts/achivemnts'
import AboutSection from '../../components/home/aboutSection/aboutSection'
import CommitteeLisiting from '../../components/member/committeeLisiting/committeeLisitng'

const societies = [
  { type: 'computer', logo: computerLogo },
  { type: 'ras', logo: rasLogo },
  { type: 'pes', logo: pesLogo },
  { type: 'wie', logo: wieLogo },
]
const HomePage = () => {
  const [old, setOld] = useState(false)

  return (
    <>
      <ScrollingProvider offset={-50}>
        <PublicHeader />
        <Hero />
        <HomeSection titlePr='About' inverted titleSc='Us' id='about'>
          <Container>
            {contents.about.map((e, i) => (
              <AboutSection key={i} title={e.title} body={e.body} />
            ))}
          </Container>
          <Divider className='divider-text' data-aos='fade-up'>
            Our Achievements
          </Divider>
          <Container>
            <Achivments />
          </Container>
        </HomeSection>
        <HomeSection
          titlePr={!old ? 'Upcoming' : ''}
          titleSc='Events'
          desc={
            !old
              ? 'Get the most of your membership by participating in these events.'
              : 'Explore These Events Which We Enjoyed..'
          }
          id='event'
        >
          <Container>
            <EventList limit={3} notExpired={true} setOld={setOld} />
          </Container>
        </HomeSection>
        <HomeSection titlePr='Our' titleSc='Team' id='team' inverted>
          <CommitteeLisiting />
        </HomeSection>
        <HomeSection inverted id='societies'>
          {societies.map((s, i) => (
            <Society type={s.type} logo={s.logo} key={i}>
              <p>{contents[s.type].p1}</p>
              <p>{contents[s.type].p2}</p>
              <p>{contents[s.type].p3}</p>
            </Society>
          ))}
          <Society logo={blackHole} type='blackhole'>
            <p>{contents.blackhole}</p>
            <Button
              type='ghost'
              href='https://blackhole.ieee-annu.com/'
              style={{ color: 'white', width: 200, fontSize: 16, lineHeight: 2 }}
            >
              View Blog
            </Button>
          </Society>
        </HomeSection>
        <Footer />
      </ScrollingProvider>
    </>
  )
}

export default HomePage
