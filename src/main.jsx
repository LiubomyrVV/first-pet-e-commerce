import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './screens/HomeScreen/HomeScreen.jsx'
import { RouterProvider } from "react-router-dom"

import 'bootstrap-icons/font/bootstrap-icons.css'
import './global.scss'

import router from './utils/router.jsx'
import { Provider } from 'react-redux'
import { store } from './features/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
