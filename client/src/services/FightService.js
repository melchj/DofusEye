import axios from 'axios';

// TODO: no reason to copy/paste a function each time i want to access new endpoint...
// theses should each refer back to some base function, passing the url

// TODO: should this just be for all API interaction? why is this class set up for just "FIGHT" services?
// i am going to use it for stat calls anway... to refactor later i suppose

export async function getFight(fight_id) {
    try {
        const response = await axios.get('/api/fights/'+fight_id, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getFightsByCharacter(character_name) {
    try {
        const response = await axios.get('/api/fights/characters/'+character_name, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getFightsList(fightIDs) {
    try {
        const response = await axios.get('/api/fights?ids='+fightIDs.join(), {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getFightIDsByCharacter(character_name) {
    try {
        const response = await axios.get('/api/fightids/characters/'+character_name, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getBasicCharacterStats(character_name) {
    try {
        const response = await axios.get('/api/stats/characters/'+character_name, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getFightImage(fightID) {
    try {
        const response = await axios.get('/api/fights/'+fightID+'/image?key='+process.env.REACT_APP_API_KEY);
        // return response.data;
        return response.config.url
    } catch (error) {
        console.log(error)
    }
}