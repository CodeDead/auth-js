import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ApiContextProvider from './contexts/ApiContextProvider';
import MainContextProvider from './contexts/MainContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainContextProvider>
      <ApiContextProvider>
        <App />
      </ApiContextProvider>
    </MainContextProvider>
  </React.StrictMode>,
);
