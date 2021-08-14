import { Button, Divider } from 'antd'
import { getColumnSearchProps } from './helpersFunctions'

const getColumns = (setRecordEdit, setRecordView) => [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%',
    sorter: (a, b) => {
      return a.name > b.name
    },
    ...getColumnSearchProps('name'),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '25%',
    ...getColumnSearchProps('email'),
  },
  {
    title: 'Member ID',
    dataIndex: 'membershipID',
    width: 160,
    ...getColumnSearchProps('membershipID'),
  },

  {
    title: 'Points',
    dataIndex: 'points',
  },

  {
    title: 'Action',
    key: 'action',

    render: function (text, record) {
      return (
        <div>
          <Button
            type='link'
            onClick={() => {
              setRecordEdit(record)
            }}
          >
            Edit
          </Button>
          <Divider type='vertical' />

          <Button
            type='link'
            onClick={() => {
              setRecordView(record)
            }}
          >
            View
          </Button>
        </div>
      )
    },
  },
]

export default getColumns
