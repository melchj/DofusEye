import React from 'react';
import './App.css';
import CharacterQuery from './components/CharacterQuery';
import FightList from './components/FightList';
import { Header } from './components/Header';
import { getFightIDsByCharacter } from './services/FightService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fightIDlist: [],
    }
  }

  updateFightIDs(character_name) {
    if (!character_name) {
      // console.log('empty string!');
      return;
    }
    // console.log('clicked for: ' + character_name)

    // fetch list of fightIDs for this character name
    var ids = [];
    getFightIDsByCharacter(character_name)
    .then((resp) => {
      // console.log(resp)

      // convert from array of json objects to array of ints
      resp.map((obj, i) => {
        ids[i] = obj['fight_id'];
      });

      // set state to save this list
      this.setState({fightIDlist: ids});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <Header></Header>
        <div className='container'>
          <CharacterQuery
            onClickHandler={this.updateFightIDs.bind(this)}
          />
          <FightList
            fightIDs={this.state.fightIDlist}
          />
        </div>
      </div>
    );
  }
}

export default App;
