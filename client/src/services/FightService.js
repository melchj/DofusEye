import axios from 'axios';

export async function getFight(fight_id) {
    try {
        const response = await axios.get('/api/fights/'+fight_id);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getFightsByCharacter(character_name) {
    try {
        const response = await axios.get('/api/fights/character/'+character_name);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getFightsList(fightIDs) {
    try {
        const response = await axios.get('/api/fights?ids='+fightIDs.join());
        return response.data;
    } catch (error) {
        console.log(error)
    }
} 