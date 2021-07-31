import './points.styles.scss'
import { List } from 'antd'
import Top3Points from '../../../components/member/top3Points/top3Points'

const Points = () => {
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]
  return (
    <>
      <div className='body'>
        <h1 className='header-text'>
          <span className='highlight-container'>
            <span className='highlight highlight-2 noselect'>Introducing Our Points System!</span>
          </span>
        </h1>
        <p className='typography'>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."
        </p>
        <h2 className='header-text'>
          <span className='highlight-container sub'>
            <span className='highlight highlight-2 noselect'>How Can I Get Points?</span>
          </span>
        </h2>
        <p className='typography'>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        </p>

        <List
          size='large'
          header={<div>Header</div>}
          footer={<div>Footer</div>}
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
