const apiKey = import.meta.env.VITE_API_KEY;

const GET_D2_ITEM = "/GET_D2_ITEM";

const getItem = (item) => ({
    type: GET_D2_ITEM,
    item,
})

export const getD2Item = (itemHash) => async (dispatch) => {
    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}`, {
        method: "GET",
        headers: {
            "X-API-KEY": apiKey
        }
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(getItem(data));
        return data;
    }
}

export const getCharacterItems = (...hashes) => async (dispatch) => {
    //...
}

const initState = {};

function bungieItemReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_D2_ITEM:
            newState = {...state}
            newState[action.item] = action.item;
            return newState;
        default:
            return state;
    }
}

export default bungieItemReducer;