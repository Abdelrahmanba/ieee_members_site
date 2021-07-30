import React, { useEffect, useState } from 'react'
import Hero from '../../components/heroSection/hero'
import HomeSection from '../../components/homeSection/homeSection'
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
import EventList from '../../components/eventList/eventList'
import { Button, Divider } from 'antd'
import Society from '../../components/society/sociey'
import UserCard from '../../components/userCard/userCard'

import contents from '../../assets/contents'
import Achivments from '../../components/achivemnts/achivemnts'
import AboutSection from '../../components/aboutSection/aboutSection'

const HomePage = () => {
  const [old, setOld] = useState(false)
  const [committee, setCommittee] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const committeeFetch = await fetch(process.env.REACT_APP_API_URL + '/users/all/committee')
      if (committeeFetch.ok) {
        const committeeFetchJson = await committeeFetch.json()
        setCommittee(committeeFetchJson)
      }
    }
    fetchData()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ScrollingProvider offset={-50}>
        <PublicHeader />
        <Hero />
        <HomeSection titlePr='About' inverted titleSc='Us' id='about'>
          <Container>
            {contents.about.map((e) => (
              <AboutSection title={e.title} body={e.body} />
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
          {committee.map((user, index) => (
            <UserCard
              key={index}
              name={user.firstName + ' ' + user.lastName}
              position={user.position}
              points={user.points}
              avatar={user.imageData}
              id={user._id}
            />
          ))}
        </HomeSection>
        <HomeSection inverted id='societies'>
          <Society type='computer' logo={computerLogo}>
            <p>{contents.computer.p1}</p>
            <p>{contents.computer.p2}</p>
            <p>{contents.computer.p3}</p>
          </Society>
          <Society type='pes' title='PES Society' logo={pesLogo}>
            <p>{contents.pes.p1}</p>
            <p>{contents.pes.p2}</p>
            <p>{contents.pes.p3}</p>
          </Society>
          <Society type='ras' title='RAS Society' logo={rasLogo}>
            <p>{contents.ras.p1}</p>
            <p>{contents.ras.p2}</p>
            <p>{contents.ras.p3}</p>
          </Society>
          <Society type='wie' title='WIE Society' logo={wieLogo}>
            <p>{contents.wie.p1}</p>
            <p>{contents.wie.p2}</p>
            <p>{contents.wie.p3}</p>
          </Society>
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
