// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Alias from './components/Alias';
import Fight from './components/Fight';
import { Header } from './components/Header';
import { getAlias } from './services/AliasService';

class Test extends React.Component {

}

function App() {

  const onChangeForm = (e) => {
    console.log(e)
  }
  
  // let req = getAlias('celunt')
  // let myMap = new Map(Object.entries(req.json));
  // getAlias('pounder')
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      <Header></Header>
      {/* <Alias
        onChangeForm={onChangeForm}
      ></Alias> */}
      <Fight></Fight>

      {/* <p>{myMap}</p> */}
    </div>
  );
}

export default App;
