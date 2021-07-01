import React from "react"
import Hero from "../../components/heroSection/hero"
import PublicHeader from "../../components/header/publicHeader"
import HomeSection from "../../components/homeSection/homeSection"
import EventCard from "../../components/eventCard/eventCard"
import Container from "../../components/container/container"
import Footer from "../../components/footer/footer"
import Achivemnt from "../../components/achivment/achivment"
import romman from "../../assets/1.png"
import groub from "../../assets/group.svg"
import trophy from "../../assets/trophy.svg"
import calendar from "../../assets/calendar.svg"

import "./home.styles.scss"

const HomePage = () => {
  return (
    <>
      <PublicHeader />
      <Hero />
      <HomeSection titlePr="About" inverted titleSc="Us">
        <Container>
          <p data-aos="fade-up" className="main-text">
            In IEEE an-Najah National University branch we aim to introduce IEEE
            to the students in our university and give them a general Idea of
            what is the IEEE and what it offers for you and create a connection
            between them and the best community out there to reach to there
            fellow knowledge seekers also we hold different kind of events
            ,workshops , training , volunteer works…etc all for the purpose of a
            better society and better world.
          </p>
          <img
            data-aos="fade-up"
            src={romman}
            data-aos-offset="300"
            className="image-1"
          />
        </Container>
      </HomeSection>
      <HomeSection
        titlePr="Upcoming"
        titleSc="Events"
        desc="Get the most of your membership by participating in these events."
      >
        <Container>
          <EventCard data-aos="fade-up" />
          <EventCard data-aos="fade-up" />
          <EventCard data-aos="fade-up" />
          <EventCard data-aos="fade-up" />
        </Container>
      </HomeSection>
      <HomeSection inverted titleSc="Achievements">
        <Container>
          <Achivemnt
            num={550}
            icon={groub}
            label="New Member"
            content="In the past 3 years"
          />
          <Achivemnt
            num={350}
            icon={calendar}
            label="Event"
            content="In the past 4 years"
          />
          <Achivemnt
            num={35}
            icon={trophy}
            label="Contests Won"
            content="In the past 10 years"
          />
        </Container>
      </HomeSection>

      <Footer></Footer>
    </>
  )
}

export default HomePage
