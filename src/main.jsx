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
      errorElement: 
      
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-2 text-red-600">Oops! Something went wrong</h1>
      <p className="text-gray-600 text-lg">We couldn't load this page right now.</p>
    </div>
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
