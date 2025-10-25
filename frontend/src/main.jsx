import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./assets/css/main.css"
import RouterConfigComponent from './config/router.config.jsx'
import store from "./config/store.config.jsx";
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <Provider store={store}>
    <RouterConfigComponent/>
    </Provider>
  </StrictMode>,
)
