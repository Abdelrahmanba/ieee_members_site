import React, { useState } from 'react'
import Hero from '../../components/heroSection/hero'
import HomeSection from '../../components/homeSection/homeSection'
import Container from '../../components/container/container'
import Footer from '../../components/footer/footer'
import Achivemnt from '../../components/achivment/achivment'
import romman from '../../assets/1.png'
import groub from '../../assets/group.svg'
import trophy from '../../assets/trophy.svg'
import calendar from '../../assets/calendar.svg'
import { ScrollingProvider } from 'react-scroll-section'

import './home.styles.scss'
import PublicHeader from '../../components/header/publicHeader'
import EventList from '../../components/eventList/eventList'
import { Divider } from 'antd'
import Paragraph from 'antd/lib/skeleton/Paragraph'
import Society from '../../components/society/sociey'

const HomePage = () => {
  const [old, setOld] = useState(false)

  return (
    <>
      <ScrollingProvider offset={-30}>
        <PublicHeader />
        <Hero />
        <HomeSection titlePr='About' inverted titleSc='Us' id='about'>
          <Container>
            <p data-aos='fade-up' className='main-text'>
              <Divider className='divider-text'>What Is IEEE</Divider>
              IEEE and its members inspire a global community to innovate for a better tomorrow
              through its more than <b>423,000 members in over 160 countries</b>, and its highly
              cited publications, conferences, technology standards, and professional and
              educational activities. IEEE is the trusted <b>“voice”</b> for engineering, computing,
              and technology information around the globe.
            </p>
            <p data-aos='fade-up' className='main-text'>
              <Divider className='divider-text'>History of IEEE</Divider>
              IEEE’s roots go back to<b>1884</b> when electricity began to become a major influence
              in society. There was one major established electrical industry, the telegraph, which
              since the 1840s had come to connect the world with a data communications system faster
              than the speed of transportation. The telephone and electric power and light
              industries had just gotten underway.
            </p>
            <p data-aos='fade-up' className='main-text'>
              <Divider className='divider-text'>What we aim to do in IEEE ANNU branch</Divider>
              In IEEE an-Najah National University branch we aim to introduce IEEE to the students
              in our university and give them a general Idea of what is the IEEE and what it offers
              for you and create a connection between them and the best community out there to reach
              to there fellow knowledge seekers also we hold different kind of events ,workshops ,
              training , volunteer works…etc all for the purpose of a better society and better
              world.
            </p>
          </Container>
          <Divider className='divider-text'>Our Achievements</Divider>
          <Container>
            <Achivemnt
              data-aos='fade-up'
              num={550}
              icon={groub}
              label='New Member'
              content='In the past 3 years'
            />
            <Achivemnt
              data-aos='fade-up'
              num={350}
              icon={calendar}
              label='Event'
              content='In the past 4 years'
            />
            <Achivemnt
              data-aos='fade-up'
              num={35}
              icon={trophy}
              label='Contests Won'
              content='In the past 10 years'
            />
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
        <HomeSection inverted id='societies' titleSc='Societies'>
          <Society title='Computer Society'>
            <p>
              The Computer Society was established at An-Najah National University in 2014.The
              Society aims to develop the student’s communication & programming skills, recognize
              them in the labor market, improve their skills and potentials and help them to
              cooperate with other IEEE members around the world. Moreover, the society hosts
              International competitions liks: IEEE Xtreme and IEEE madC. We should note that our
              branch took first place in IEEE Xtreme competition in Palestine last year.
            </p>
            <p>
              The society also organizes a lot of activities such as contests, online sessions and
              practical sessions, for example Think like a Programmer Competition (TLAP). It aims to
              develop logical thinking and solve problems. It is a competition not specific to the
              computer students, which means that any student can participate and develop his
              skills. Also XCoders is a programming contest to solve programming problems and issues
              using programming languages. And Web Contest, it is the best website contest to
              encourage and support outstanding students, and shade the light on successful projects
              that the students developed it on their courses.In addition, C/C++ and python
              practical sessions to improve students skills in these programming languages in a nice
              practical way.
            </p>
            <p>
              Moreover, the Computer Society makes visits and tours to software companies in order
              to familiarize students with the nature of work in these companies.
            </p>
          </Society>
        </HomeSection>
        <Footer />
      </ScrollingProvider>
    </>
  )
}

export default HomePage
