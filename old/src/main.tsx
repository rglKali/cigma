import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider, ThemeProvider } from './providers/index.ts'
import App from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
