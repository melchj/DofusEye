import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CharacterQuery from '../components/CharacterQuery';
import FightList from '../components/FightList';
import Stats from '../components/Stats';
import { getFightIDsByCharacter } from '../services/ApiService';

const CharacterPage = () => {
    const [fightIDlist, setFightIDs] = useState([]);
    const [characterName, setCharacterName] = useState('');
    const { name } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    // triggers when route changes, and when component loads
    useEffect(() => {
        updateFightIDs(name)
    }, [location]);

    const updateFightIDs = (character_name) => {
        if (!character_name || character_name === '') {
            return;
        }

        var ids = [];
        getFightIDsByCharacter(character_name)
        .then((resp) => {
            resp.map((obj, i) => {
                ids[i] = obj['fight_id'];
            });

            setFightIDs(ids)
        })
        .catch((error) => {
            console.log(error);
        });

        setCharacterName(character_name);
    }

    const queryClicked = (x) => {
        console.log(x)
        navigate('/character/'+x)
    }

    return (
        <div>
            <CharacterQuery/>
            <Stats
                characterName={characterName}
            />
            <FightList
                fightIDs={fightIDlist}
                target={characterName}
            />
        </div>
    );
}

export default CharacterPage;