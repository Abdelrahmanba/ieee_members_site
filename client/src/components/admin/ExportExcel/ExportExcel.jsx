import './ExportExcel.styles.scss'

import ReactExport from 'react-export-excel'
import { Button } from 'antd'
import Title from 'antd/lib/skeleton/Title'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const ExportExcel = ({ members, membersCol, nonMembers, nonMembersCol }) => {
  return (
    <ExcelFile element={<Button type='primary'>Download XLXS</Button>}>
      <ExcelSheet data={members} name={'Members'}>
        {membersCol.map((c, i) => (
          <ExcelColumn label={c.title} value={c.dataIndex} key={i} />
        ))}
      </ExcelSheet>
      <ExcelSheet data={nonMembers} name={'Non Members'}>
        {nonMembersCol.map((c, i) => (
          <ExcelColumn label={c.title} value={c.dataIndex} key={i} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  )
}

export default ExportExcel
