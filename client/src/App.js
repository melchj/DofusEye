import React from 'react';
import './App.css';
import CharacterQuery from './components/CharacterQuery';
import FightList from './components/FightList';
import HomePage from './pages/HomePage'
import CharacterPage from './pages/CharacterPage'
import AccountPage from './pages/AccountPage'
import NoPage from './pages/NoPage';
import { Switch, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import Stats from './components/Stats';
import { getFightIDsByCharacter } from './services/FightService';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fightIDlist: [],
//     }
//   }

//   updateFightIDs(character_name) {
//     if (!character_name) {
//       // console.log('empty string!');
//       return;
//     }
//     // console.log('clicked for: ' + character_name)

//     // fetch list of fightIDs for this character name
//     var ids = [];
//     getFightIDsByCharacter(character_name)
//     .then((resp) => {
//       // console.log(resp)

//       // convert from array of json objects to array of ints
//       resp.map((obj, i) => {
//         ids[i] = obj['fight_id'];
//       });

//       // set state to save this list
//       this.setState({fightIDlist: ids});
//     })
//     .catch((error) => {
//       console.log(error);
//     })

//     // also, update the Stats component
//     this.setState({characterName: character_name});
//   }

//   render() {
//     return (
//       <div>
//         <Header></Header>
//         <div className='container'>
//           <CharacterQuery
//             onClickHandler={this.updateFightIDs.bind(this)}
//           />
//           <Stats
//             characterName={this.state.characterName}
//           />
//           <FightList
//             fightIDs={this.state.fightIDlist}
//           />
//         </div>
//       </div>
//     );
//   }
// }

function App() {


  return (
    <div className='app'>
      <Header/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/character' element={<CharacterPage/>}/>
          <Route path='/account' element={<AccountPage/>}/>
          <Route path='*' element={<NoPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
