// Router
import Router from './router/main.router'
// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
// AOS
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

let persistor = persistStore(store)

function App() {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  )
}

export default App
