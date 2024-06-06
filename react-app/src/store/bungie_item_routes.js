const apiKey = process.env.REACT_APP_API_KEY;

const GET_D2_ITEM = "/GET_D2_ITEM";
const GET_CHAR_ITEMS = "/GET_CHAR_ITEMS";

const getItem = (item) => ({
    type: GET_D2_ITEM,
    item,
})

const getCharacterItems = (items) => ({
    type: GET_CHAR_ITEMS,
    items,
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

export const getD2CharacterItems = (...hashes) => async (dispatch) => {
    const responses = [];

    for (let hash of hashes) {
        const hashRes = await fetch(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${hash}`, {
            method: "GET",
            headers: {
                "X-API-KEY": apiKey
            }
        });

        if (hashRes.ok) {
            const hashData = await hashRes.json();
            responses.push(hashData)
        }
    }

    dispatch(getCharacterItems(responses));
    return responses;
}

const initState = {};

function bungieItemReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_D2_ITEM:
            newState = {...state}
            newState[action.item] = action.item;
            return newState;
        case GET_CHAR_ITEMS:
            newState = {...state}
            action.items.forEach(item => {
                newState[item.itemHash] = item;
            })
            return newState;
        default:
            return state;
    }
}

export default bungieItemReducer;