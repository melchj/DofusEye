import React from 'react';
import './App.css';
import HomePage from './pages/HomePage'
import CharacterPage from './pages/CharacterPage'
import AccountPage from './pages/AccountPage'
import NoPage from './pages/NoPage';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import FightsPage from './pages/FightsPage';

function App() {
  return (
    <div className='app'>
      <Header/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/character' element={<CharacterPage/>} exact/>
          <Route path='/character/:name' element={<CharacterPage/>}/>
          <Route path='/account' element={<AccountPage/>}/>
          <Route path='/fights' element={<FightsPage/>}/>
          <Route path='*' element={<NoPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
