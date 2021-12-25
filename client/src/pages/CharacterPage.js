import React, { useState } from 'react';
import CharacterQuery from '../components/CharacterQuery';
import FightList from '../components/FightList';
import { Header } from '../components/Header';
import Stats from '../components/Stats';
import { getFightIDsByCharacter } from '../services/FightService';

export default function CharacterPage() {
    const [fightIDlist, setFightIDs] = useState([]);
    const [characterName, setCharacterName] = useState('');

    const updateFightIDs = (character_name) => {
        // ignore if empty string
        if (!character_name) {
            return;
        }

        // fetch list of fightIDs for this character name
        var ids = [];
        getFightIDsByCharacter(character_name)
        .then((resp) => {
            // convert from array of json objects to array of ints
            resp.map((obj, i) => {
                ids[i] = obj['fight_id'];
            });

            // set state to save this list
            setFightIDs(ids)
        })
        .catch((error) => {
            console.log(error);
        });

        // update the Stats component
        setCharacterName(character_name);
    }

    return (
        <div>
            <CharacterQuery
                onClickHandler={updateFightIDs}
            />
            <Stats
                characterName={characterName}
            />
            <FightList
                fightIDs={fightIDlist}
            />
        </div>
    );
}