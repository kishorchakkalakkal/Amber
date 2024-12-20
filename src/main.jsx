import React  from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './Redux/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <BrowserRouter basename="/amber" >
        <App />
    </BrowserRouter>
  </Provider>
)
