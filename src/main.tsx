import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './contexts/Theme/Theme.context'
import { ConverterProvider } from './contexts/Converter/Converter.context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <ConverterProvider>
        <App />
      </ConverterProvider>
    </ThemeProvider>
  </React.StrictMode>
)
