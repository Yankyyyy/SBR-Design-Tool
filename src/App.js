// src/App.js
import React from 'react';
import { BrowserRouter as HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import SBR from './pages/SBR';
import NavBar from './components/NavBar';



const App = () => {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SBR" element={<SBR />} />
      </Routes>
    </HashRouter>
  );
};

export default App;