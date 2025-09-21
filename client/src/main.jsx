import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Import here
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- This MUST be the outer wrapper */}
      <AuthProvider>
        <ScrollToTop />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);