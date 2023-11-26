import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ChakraProvider } from '@chakra-ui/react'
import theme from './chakraTheme.js'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <ChakraProvider theme={theme}>
    <ToastContainer />
    <div className="conteiner">
      <App />
    </div>
  </ChakraProvider>

)
