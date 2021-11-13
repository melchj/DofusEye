// const axios = require('axios');

export async function getAlias(char_name) {
    const axios = require('axios');

    try {
        const response = await axios.get('/api/aliases?name='+char_name);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
    // axios.get('/api/aliases?name='+char_name)
    // .then(response => {
    //     console.log(response)
    // })
    // .catch(error => {
    //     console.log(error)
    // })

    // return fetch('/api/aliases?name='+char_name)
    //     .then(response => response.json())
    //     .then(data => console.log(data));
    
    // try {
    //     const response = await fetch('/api/aliases?name='+char_name);
    //     console.log(await response.json())
    //     return await response.json();
    // } catch (error) {
    //     return [];
    // }
}