import axios from 'axios';
// export async function getFight() {
//     try{
//         const response = await fetch('/api/fight');
//         return await response.json();
//     }catch(error) {
//         return [];
//     }
    
// }

// export async function createUser(data) {
//     const response = await fetch(`/api/user`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({user: data})
//       })
//     return await response.json();
// }

// export function getFight(fight_id) {
//     // const axios = require('axios');
//     // try {
//     //     const response = await axios.get('/api/fights/'+fight_id);
//     //     // console.log(response.data);
//     //     return response.data;
//     // } catch (error) {
//     //     console.log(error);
//     //     return[];
//     // }

//     return axios.get('/api/fights/'+fight_id)
//         .then((response) => {
//             // console.log(response.data)
//             return response.data
//         });
// }

export async function getFight(fight_id) {
    try {
        const {data:response} = await axios.get('/api/fights/'+fight_id)
        return response
    } catch (error) {
        console.log(error)
    }
}