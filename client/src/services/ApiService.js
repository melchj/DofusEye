import axios from 'axios';

// TODO: no reason to copy/paste a function each time i want to access new endpoint...
// theses should each refer back to some base function, passing the url

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

// const api = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3000"
// });

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

export async function getFightsByCharacter(character_name, wins=true, losses=true, attacks=true, defs=true) {
    var query = ''
    if (!wins) {;
        query = query + 'w=false&'
    }
    if (!losses) {
        query = query + 'l=false&';
    }
    if (!attacks) {
        query = query + 'a=false&';
    }
    if (!defs) {
        query = query + 'd=false&';
    }
    if (query != '') {
        query = '?'+query;
    }
    console.log('query: '+query)
    try {
        const response = await axios.get('/api/fights/characters/'+character_name+''+query, {
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

export function getFightImage(fightID) {
    const url = '/api/fights/'+fightID+'/image?key='+process.env.REACT_APP_API_KEY;
    return axios.get(url).then((response) => {
        return response.data;
    });
}

export function getCharLeaderboard(start_timestamp, end_timestamp, dclass, sort, min_fights, page, per_page){
    // TODO: clean this up, handle if one of the arguments is null or something
    if (dclass == 'all') {
        dclass = ''
    }
    const url = '/api/characters?_page='+page+'&_per_page='+per_page+'&dclass='+dclass+'&min_fights='+min_fights+'&start_date='+start_timestamp+'&end_date='+end_timestamp+'&_sort='+sort
    return axios.get(url).then((response) => {
        return response.data;
    });
}