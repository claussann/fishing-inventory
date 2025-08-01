import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './Pages/Home';
import reportWebVitals from './reportWebVitals';
import Inventory from './Pages/Inventory';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
