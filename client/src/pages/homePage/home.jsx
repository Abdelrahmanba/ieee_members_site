import React, { useEffect, useState } from 'react'
import Hero from '../../components/heroSection/hero'
import PublicHeader from '../../components/header/publicHeader'
import HomeSection from '../../components/homeSection/homeSection'
import EventCard from '../../components/eventCard/eventCard'
import Container from '../../components/container/container'
import Footer from '../../components/footer/footer'
import Achivemnt from '../../components/achivment/achivment'
import romman from '../../assets/1.png'
import groub from '../../assets/group.svg'
import trophy from '../../assets/trophy.svg'
import calendar from '../../assets/calendar.svg'
import { ScrollingProvider } from 'react-scroll-section'

import './home.styles.scss'

const HomePage = () => {
  const [events, setEvents] = useState([])
  const [old, setOld] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const upevents = await fetch(process.env.REACT_APP_API_URL + '/event?limit=4&notExpired=true')
      if (upevents.ok) {
        const resJson = await upevents.json()
        if (resJson.length === 0) {
          const oldevents = await fetch(process.env.REACT_APP_API_URL + '/event?limit=4')
          const eventsJson = await oldevents.json()
          setEvents(eventsJson)
          setOld(true)
        } else {
          setEvents(resJson)
          setOld(false)
        }
      }
    }
    fetchEvents()
  }, [])
  return (
    <>
      <ScrollingProvider offset={-30}>
        <PublicHeader />
        <Hero />
        <HomeSection titlePr='About' inverted titleSc='Us' id='about'>
          <Container>
            <p data-aos='fade-up' className='main-text'>
              In IEEE an-Najah National University branch we aim to introduce IEEE to the students
              in our university and give them a general Idea of what is the IEEE and what it offers
              for you and create a connection between them and the best community out there to reach
              to there fellow knowledge seekers also we hold different kind of events ,workshops ,
              training , volunteer works…etc all for the purpose of a better society and better
              world.
            </p>
            <img data-aos='fade-up' alt='' src={romman} data-aos-offset='300' className='image-1' />
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
            {events.map(({ title, startDate, _id, location, price, description }) => (
              <EventCard
                data-aos='fade-up'
                key={_id}
                title={title}
                date={new Date(startDate).toISOString()}
                location={location}
                id={_id}
                price={price}
                description={description}
              />
            ))}
          </Container>
        </HomeSection>
        <HomeSection inverted id='achievemnets' titleSc='Achievements'>
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
        <Footer />
      </ScrollingProvider>
    </>
  )
}

export default HomePage
