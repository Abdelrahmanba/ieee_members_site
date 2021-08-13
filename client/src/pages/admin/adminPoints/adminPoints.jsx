import './adminPoints.styles.scss'
import React, { useState } from 'react'
import PointsTable from '../../../components/admin/pointsTable/pointsTable'
import AddPoints from '../../../components/admin/addPoints/addPoints'
import PointsList from '../../../components/admin/pointsList/pointsList'
const AdminPoints = () => {
  const [reload, setReload] = useState(false)

  return (
    <div className='body'>
      <h1 className='title'>Credit Members</h1>
      <AddPoints reload={reload} setReload={setReload} />
      <h1 className='title'>Committee Criteria</h1>
      <PointsList type='committee' editable />
      <h1 className='title'>Members Criteria</h1>
      <PointsList type='members' editable />
      <h1 className='title'>Points Table</h1>
      <PointsTable reload={reload} setReload={setReload} />
    </div>
  )
}

export default AdminPoints
