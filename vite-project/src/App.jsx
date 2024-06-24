import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import GitHubIcon from "./assets/github.png";
import LinkedInIcon from "./assets/linkedin.png";
import './App.css'

import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import D2Profile from './components/D2Profile';
import D2PlayerSearch from './components/D2PlayerSearch';
import D2ItemSearch from './components/D2ItemSearch';
import D2Item from './components/D2Item';

function App() {

  return (
    <>
      <Navigation />

      <Routes>
        <Route path='/search/item' element={<D2ItemSearch />} />
        <Route path='/item/:itemHash' element={<D2Item />} />
        <Route path="/search/player" element={<D2PlayerSearch />} />
        <Route path='/profile/:memId' element={<D2Profile />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      <footer className='site-footer'>
        <div className='footer-container'>
          <a>Made by Saad Anwer | </a>

          <a className="contributor" href="https://github.com/anwersaad0">
            <img className='github-icon' src={GitHubIcon} alt='GitHub'></img>
          </a>

          <a> | </a>

          <a className="contributor" href="https://www.linkedin.com/in/anwersaad0/">
            <img className='linkedin-icon' src={LinkedInIcon} alt='LinkedIn'></img>
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
