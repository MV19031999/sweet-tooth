import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './main.css'
import App from './App.jsx'
import StoreContextFunction from './Context/StoreContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextFunction>
      <App />
    </StoreContextFunction>
  </BrowserRouter>
)
