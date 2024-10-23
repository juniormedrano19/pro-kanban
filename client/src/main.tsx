import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import store, { persistor } from './redux/index.ts'
import { router } from './router/router.tsx'
import { Toast } from './components/Toast/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <Toast />
      </PersistGate>
    </Provider>

  </StrictMode>,
)
