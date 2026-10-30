// src/MainPage.jsx
import React from 'react';
import './App.css'; // You can share styles or create a MainPage.css

export default function MainPage() {
  return (
    <div className="main-container">
      <h1>Dashboard</h1>
      
      {/* Put your budget components or weather widget here */}
      <div className="APIs"> 
        <p>{/* weather data */}</p>
        <p id="time">{/* time data */}</p>
        <h1>I am</h1>
      </div>
    </div>
  );
}