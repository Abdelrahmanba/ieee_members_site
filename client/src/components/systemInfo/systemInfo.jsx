import { message, Progress, Spin, Statistic } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get } from '../../utils/apiCall'
import './systemInfo.styles.scss'
import { LoadingOutlined } from '@ant-design/icons'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const SystemInfo = (params) => {
  const [systemInfo, setSystemInfo] = useState(undefined)
  const token = useSelector((state) => state.user.token)
  const [loading, setLoading] = useState(true)
  let timeout = undefined

  useEffect(() => {
    const fetchData = async () => {
      const res = await get('/systemInfo', token)
      if (res.ok) {
        const resJson = await res.json()
        setSystemInfo(resJson)
        setLoading(false)
      } else {
        message.error('Something Went Wrong.')
      }
      fetch()
    }
    fetchData()
    return () => clearTimeout(timeout)
  }, [])

  const fetch = async () => {
    const res = await get('/systemInfo', token)
    if (res.ok) {
      const resJson = await res.json()
      setSystemInfo(resJson)
    }
    timeout = setTimeout(fetch, 1000)
  }

  return (
    <Spin
      spinning={loading}
      wrapperClassName='spinner'
      indicator={antIcon}
      style={{ width: '100%' }}
    >
      {systemInfo && (
        <div className='systemInfo'>
          <Statistic className='item' title='Total Memory (MB)' value={systemInfo.totalmem} />
          <Statistic className='item' title='Cores' value={systemInfo.cores} />
          <Statistic className='item' title='Platform' value={systemInfo.platform} />
          <Statistic
            className='item'
            title='Disk (GB)'
            value={(systemInfo.disk.total / (1024 * 1024 * 1024)).toFixed(2)}
          />
        </div>
      )}
      {systemInfo && (
        <div className='systemInfo'>
          {systemInfo && <Statistic title='Proccessor' value={systemInfo.cpuModel} />}
        </div>
      )}

      {systemInfo && (
        <div className='systemInfo'>
          <div className='percent'>
            <h2>CPU Usage</h2>
            <Progress
              type='circle'
              strokeColor={{
                '0%': '#108ee9',
                '100%': 'darkred',
              }}
              percent={parseInt(systemInfo.cpuUsage * 100)}
            />
          </div>
          <div className='percent'>
            <h2>Memory Usage</h2>
            <Progress
              type='circle'
              strokeColor={{
                '0%': '#108ee9',
                '100%': 'darkred',
              }}
              percent={parseInt(
                ((systemInfo.totalmem - systemInfo.freeMem) / systemInfo.totalmem) * 100
              )}
            />
          </div>
          <div className='percent'>
            <h2>Disk Usage</h2>
            <Progress
              type='circle'
              strokeColor={{
                '0%': '#108ee9',
                '100%': 'darkred',
              }}
              percent={parseInt(
                ((systemInfo.disk.total - systemInfo.disk.available) / systemInfo.disk.total) * 100
              )}
            />
          </div>
        </div>
      )}
    </Spin>
  )
}

export default SystemInfo
