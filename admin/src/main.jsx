import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AdminContextFunction from './Context/AdminContext.jsx'

import './main.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AdminContextFunction>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AdminContextFunction>
)
