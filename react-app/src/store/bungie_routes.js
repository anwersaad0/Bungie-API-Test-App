const apiKey = process.env.REACT_APP_API_KEY;

const GET_D2_PROFILE = "/GET_D2_PROFILE";
// const GET_D2_ITEM = "/GET_D2_ITEM";

const getProfile = (profile) => ({
    type: GET_D2_PROFILE,
    profile,
})

// const getItem = (item) => ({
//     type: GET_D2_ITEM,
//     item,
// })

export const getD2Profile = () => async (dispatch) => {
    //console.log('api key there?', apiKey);

    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018483417802/?components=100,200,205`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey
        },
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(getProfile(data));
        return data;
    }
}

// export const getD2Item = (itemHash) => async (dispatch) => {
//     const res = await fetch(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}`, {
//         method: "GET",
//         headers: {
//             "X-API-KEY": apiKey
//         }
//     });

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(getItem(data));
//         return data;
//     }
// }


const initState = {};

function bungieReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_D2_PROFILE:
            newState = {...state}
            newState[action.profile] = action.profile;
            return newState;
        // case GET_D2_ITEM:
        //     newState = {...state}
        //     newState[action.item] = action.item;
        //     return newState;
        default:
            return state;
    }
}

export default bungieReducer;