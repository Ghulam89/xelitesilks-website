import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css'
hydrateRoot(
  document.getElementById('root'),
  <>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App serverData={window.__SERVER_DATA__} /> 
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </>
)