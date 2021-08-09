import './points.styles.scss'
import { List } from 'antd'
import Top3Points from '../../../components/member/top3Points/top3Points'

const Points = () => {
  const data = [
    'Volunteering to record an IEEE-Black Hole Podcast - 5 points.',
    'Translating an article for IEEE- Black Hole - 5 points.',
    'Volunteering in Arduino practical workshops -15 points.',
    'Volunteering in any technical activity -depends on the activity.',
    'Attending any session - 3 points.',
    'Attending a course or a workshop - 10 points.', 
    'Getting "Top Fan" badge on facebook - 10 points.', 
    'Winning any IEEE competition - 10 points.', 
    'Participating in any IEEE competition - 5 points'
  ]
  return (
    <>
      <div className='body'>
      <h1 className='header-text'>
            <span className='title'>Introducing Our Points System!</span>
      </h1>
        <p className='typography'>
        In order to ensure fairness between members and to provide a distinctive imposition for the most active and special members, we present to you the points system that will be followed in IEEE, where points will be calculated for each member based on his volunteering, effectiveness and participation in activities.
        Opportunities to attend conferences, Training days, Financial prizes and more will be waiting for the top members!! 
        </p>
        <h2 className='header-text'>
          
            <span className='highlight highlight-2 noselect'>How Can I Get Points?</span>
        </h2>
        <p className='typography'>
          We introduce to you the criteria that will be followed to evaluate each member's points, increase your points now and become one of our top members!
        </p>

        <List
          size='large'
          header={<div>لا داعي للهيدر أخوي</div>}
          footer={<div>ولا للفوتر</div>}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          className='list'
        />
        <section>
          <h2 className='header-text'>
            <span className='highlight-container sub'>
              <span className='highlight highlight-2 noselect'>Top 3 Members</span>
            </span>
          </h2>
          <Top3Points />
        </section>
      </div>
    </>
  )
}

export default Points
