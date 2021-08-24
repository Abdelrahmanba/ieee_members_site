import './points.styles.scss'
import Top3Points from '../../../components/member/top3Points/top3Points'
import PointsList from '../../../components/admin/pointsList/pointsList'

const Points = () => {
  return (
    <>
      <div className='body'>
        <h1 className='header-text'>
          <span className='title'>Introducing Our Points System!</span>
        </h1>
        <p className='typography'>
          In order to ensure fairness between members and to provide a distinctive imposition for
          the most active and special members, we present to you the points system that will be
          followed in IEEE, where points will be calculated for each member based on his
          volunteering, effectiveness and participation in activities. Opportunities to attend
          conferences, Training days, Financial prizes and more will be waiting for the top
          members!!
        </p>
        <h2 className='header-text'>
          <span className='highlight highlight-2 noselect'>How Can I Get Points?</span>
        </h2>
        <p className='typography'>
          We introduce to you the criteria that will be followed to evaluate each member's points,
          increase your points now and become one of our top members!
        </p>
        <PointsList type='members' />
        <h2 className='header-text'>Top 3 Members</h2>
        <Top3Points />
      </div>
    </>
  )
}

export default Points
