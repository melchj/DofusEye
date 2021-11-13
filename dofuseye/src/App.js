// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Alias from './components/Alias';
import Fight from './components/Fight';
import { Header } from './components/Header';
import { getAlias } from './services/AliasService';
import { getFight } from './services/FightService';

function App() {

  return (
    <div>
      <Header></Header>
      {/* <Alias
        onChangeForm={onChangeForm}
      ></Alias> */}
      <Fight></Fight>
    </div>
  );
}

export default App;
