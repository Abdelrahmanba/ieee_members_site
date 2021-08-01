import React, { Suspense } from 'react'
import './loading.styles.scss'
const HomePage = React.lazy(() => import('../../pages/homePage/home'))

const Loading = () => {
  return (
    <Suspense
      fallback={
        <div className='loadong'>
          <div class='lds-ripple'>
            <div></div>
            <div></div>
          </div>
        </div>
      }
    >
      <HomePage />
    </Suspense>
  )
}

export default Loading
