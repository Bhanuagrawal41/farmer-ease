import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
         <Provider store={store}>
              {/* This is the ONLY top-level router */}
              <BrowserRouter>
                <App />
              </BrowserRouter>
         </Provider>
      </StrictMode>
    );
}