import './adminPoints.styles.scss'
import React, { useState } from 'react'
import { AutoComplete } from 'antd'
import Textfield from '../../components/textfield/textfield'
import PointsTable from '../../components/pointsTable/pointsTable'

const AdminPoints = () => {
  const [amount, setAmount] = useState('')
  const [title, setTitle] = useState('')

  return (
    <div className='body'>
      <h1 className='title'>Credit Members</h1>
      <Textfield
        text='Title'
        placeholder='Ex:10 points for participating in ...'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textfield
        text='Amount'
        name='amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <h1 className='title'>Points Table</h1>
      <PointsTable />
    </div>
  )
}

export default AdminPoints
