import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// CONTEXT
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/context/AuthContext.jsx';

// BOOSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// TOAST
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
