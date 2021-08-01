import { Button, Tag } from 'antd'
import { getColumnSearchProps } from './helpersFunctions'

const getColumns = (setRecord) => [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left',
    width: 220,
    sorter: (a, b) => {
      return a.name > b.name
    },
    ...getColumnSearchProps('name'),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    fixed: 'left',
    width: 200,
    ...getColumnSearchProps('email'),
  },
  {
    title: 'Member ID',
    dataIndex: 'membershipID',
    width: 160,
    ...getColumnSearchProps('membershipID'),
  },

  {
    title: 'Position',
    dataIndex: 'position',
    ...getColumnSearchProps('position'),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 130,
    filters: [
      {
        text: 'Active',
        value: 'Active',
      },
      {
        text: 'Pending Email',
        value: 'Pending Email',
      },
      {
        text: 'Pending Commttiee',
        value: 'Pending Commttiee',
      },
    ],
    onFilter: (value, record) => record.status.includes(value),

    render: (tag) => (
      <Tag
        color={tag === 'Active' ? 'green' : tag === 'Pending Email' ? 'geekblue' : 'orange'}
        key={tag}
      >
        {tag.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 50,

    render: function (text, record) {
      return (
        <div>
          <Button
            type='link'
            onClick={() => {
              setRecord(record)
            }}
          >
            Edit
          </Button>
        </div>
      )
    },
  },
]

export default getColumns
