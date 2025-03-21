import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./assets/css/main.css"
import RouterConfigComponent from './config/router.config.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterConfigComponent/>
  </StrictMode>,
)
