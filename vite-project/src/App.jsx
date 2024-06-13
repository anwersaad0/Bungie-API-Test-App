import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'

import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import D2Profile from './components/D2Profile';
import D2PlayerSearch from './components/D2PlayerSearch';
import D2ItemSearch from './components/D2ItemSearch';

function App() {

  return (
    <>
      <Navigation />

      <Routes>
        <Route path='/search/item' element={<D2ItemSearch />} />
        <Route path="/search/player" element={<D2PlayerSearch />} />
        <Route path='/profile/:memId' element={<D2Profile />} />
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </>
  )
}

export default App
