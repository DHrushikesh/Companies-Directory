import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Provider } from 'react-redux'

import store from "./redux/store.js"
import DashBoard from '../src/componenets/Dashboard.jsx'
import './index.css'
import App from './App.jsx'


const route = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <DashBoard />
        }],
      errorElement: <h1>Ok I found the error</h1>
    }

  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <RouterProvider router={route} />

    </Provider>
  </StrictMode>,
)
