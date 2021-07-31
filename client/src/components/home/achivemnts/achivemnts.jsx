import Achivemnt from '../achivment/achivment'

import groub from '../../../assets/icons/group.svg'
import trophy from '../../../assets/icons/trophy.svg'
import calendar from '../../../assets/icons/calendar.svg'

const Achivments = () => {
  return (
    <>
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
    </>
  )
}

export default Achivments
