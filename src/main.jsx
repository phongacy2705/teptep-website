import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// File này chỉ còn làm một nhiệm vụ duy nhất là render component App
// Không import bất kỳ file CSS nào ở đây nữa
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
