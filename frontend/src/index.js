import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './pages/AppRouter'; // le routeur que vous venez de créer

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);