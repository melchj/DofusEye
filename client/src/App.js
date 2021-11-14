import React from 'react';
import './App.css';
import FightList from './components/FightList';
import { Header } from './components/Header';

function App() {

  return (
    <div>
      <Header></Header>
      <FightList
        fightIDs={[22, 23, 656, 77, 55, 193]}
      />
    </div>
  );
}

export default App;
