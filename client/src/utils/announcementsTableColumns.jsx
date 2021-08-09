import { Button } from 'antd'

const getColumns = (history) => [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => {
      return new Date(a.date) - new Date(b.date)
    },
    render: function (text, record) {
      return new Date(text).toLocaleDateString()
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: function (text, record) {
      return (
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <Button type='link' onClick={() => history.push('/announcement/' + text.key)}>
            View
          </Button>
        </div>
      )
    },
  },
]

export default getColumns
