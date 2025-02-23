import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { router } from './routes/routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import AuthProvider from './providers/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
    
  </StrictMode>,
)
