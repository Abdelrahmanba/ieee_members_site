import React, { useEffect, useState } from 'react'
import Hero from '../../components/heroSection/hero'
import HomeSection from '../../components/homeSection/homeSection'
import Container from '../../components/container/container'
import Footer from '../../components/footer/footer'
import Achivemnt from '../../components/achivment/achivment'
import groub from '../../assets/group.svg'
import trophy from '../../assets/trophy.svg'
import calendar from '../../assets/calendar.svg'
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
            <Divider className='divider-text' data-aos='fade-up'>
              What Is IEEE
            </Divider>
            <p data-aos='fade-up' className='main-text'>
              IEEE and its members inspire a global community to innovate for a better tomorrow
              through its more than <b>423,000 members in over 160 countries</b>, and its highly
              cited publications, conferences, technology standards, and professional and
              educational activities. IEEE is the trusted <b>“voice”</b> for engineering, computing,
              and technology information around the globe.
            </p>
            <Divider className='divider-text' data-aos='fade-up'>
              History of IEEE
            </Divider>
            <p data-aos='fade-up' className='main-text'>
              IEEE’s roots go back to<b>1884</b> when electricity began to become a major influence
              in society. There was one major established electrical industry, the telegraph, which
              since the 1840s had come to connect the world with a data communications system faster
              than the speed of transportation. The telephone and electric power and light
              industries had just gotten underway.
            </p>
            <Divider className='divider-text' data-aos='fade-up'>
              What we aim to at the branch
            </Divider>
            <p data-aos='fade-up' className='main-text'>
              In IEEE an-Najah National University branch we aim to introduce IEEE to the students
              in our university and give them a general Idea of what is the IEEE and what it offers
              for you and create a connection between them and the best community out there to reach
              to there fellow knowledge seekers also we hold different kind of events ,workshops ,
              training , volunteer works…etc all for the purpose of a better society and better
              world.
            </p>
          </Container>
          <Divider className='divider-text' data-aos='fade-up'>
            Our Achievements
          </Divider>
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
          <Society type='pes' title='PES Society' logo={pesLogo}>
            <p>
              The Power and energy society is one of the largest IEEE societies around the world and
              It consists of Over 40,000 members in 150 countries. It was established at An-Najah
              National University in 2016. Our society focuses on the scientific and engineering
              information about electric power and energy. IEEE PES provides the world with the
              latest technological developments in the electric power industry to become the leading
              provider of scientific and engineering information on electric power and energy.
            </p>
            <p>
              Moreover, the society offers many international events like PES Day, IEEE PES Student
              Congress and a lot of seminars,conferences and competitions. We should mention that
              our branch took the most IEEE PES Day 2020 activities in region 8 last year.
            </p>
            <p>
              The Power and energy society also organizes a lot of events and activities which focus
              on technical skills such as PLC courses, Welding workshops and a lot of technical
              workshops. Also, we will start the basic skill chain which focus on the basic skills
              for any engineer like Matlap, Autocad, Excel and Multisim. Moreover, the Power and
              energy Society makes visits and tours to factories, Solar power stations and
              electrical companies to form an idea for students about the real nature of work after
              graduation.
            </p>
          </Society>
          <Society type='ras' title='RAS Society' logo={rasLogo}>
            <p>
              The IEEE Robotics and Automation Society started in An-najah national university at
              2020, its main object to help students in learning new subjects and develop them in
              what they’ve learned, this society basically is concerned in the theory and practice
              of robotics and automation engineering and science and of the allied arts and
              sciences.
            </p>
            <p>
              In this society there is a lot of Conferences & Workshops beside funding reaseches,
              there is a lot of data that helps people who are interested in this field at the
              official site.
            </p>
            <p>
              In our branch we organized very helpful activities for the members like the Arduino
              Teaching Workshop, the meetings with people who have more knowledge and experiences
              and alot.
            </p>
          </Society>
          <Society type='wie' title='WIE Society' logo={wieLogo}>
            <p>
              IEEE Women in Engineering (WIE) is one of the largest international professional
              organizations dedicated to promoting women engineers and scientists and inspiring
              girls around the world to follow their academic interests to a career in engineering.
            </p>
            <p>
              The community aims to support women in the fields of engineering and science,
              highlighting their talents and providing them with experiences and skills that
              contribute to supporting their participation in the society The community organizes
              many social activities on many occasions to support women.
            </p>
            <p>
              One of the most important activities of the An-Najah National University branch is the
              Palestinian Women and Leadership Conference, which discusses the reality of
              Palestinian women in engineering and the most prominent challenges they face.
            </p>
          </Society>
          <Society logo={blackHole} type='blackhole'>
            <p>
              The Black Hole Series is a scientific series launched by the Student Branch of IEEE,
              An-Najah National University Branch, that seeks to enrich the Arab scientific content
              by translating Arabic scientific articles and creating distinctive content by
              highlighting the latest developments in the world of science and technology. Our
              ultimate goal is to create a scientific platform that reaches For different Arab
              youth.
            </p>
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
