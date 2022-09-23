import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TryUpload from './try';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { StyledEngineProvider } from '@mui/material/styles';

import { AuthContextProvider } from './DashboardPages/context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StyledEngineProvider injectFirst>
        <App />
        {/* <TryUpload /> */}
      </StyledEngineProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

