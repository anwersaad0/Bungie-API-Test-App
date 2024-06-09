const apiKey = import.meta.env.VITE_API_KEY;

const GET_PLAYERS = "/GET_PLAYERS";

const getPlayers = (players) => ({
    type: GET_PLAYERS,
    players,
});

export const getPlayersByName = (playerName) => async (dispatch) => {
    const res = await fetch("https://www.bungie.net/Platform/User/Search/GlobalName/:page/", {
        method: "POST",
        headers: {
            "X-API-Key": apiKey
        },
        body: {
            "displayNamePrefix": playerName
        }
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(getPlayers(data));
        return data;
    }
}

export const getPlayersByDisplayParams = (playerName, playerCode) => async (dispatch) => {
    const res = await fetch("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/All/", {
        method: "POST",
        headers: {
            "X-API-Key": apiKey
        },
        body: {
            "displayName": playerName,
            "displayNameCode": playerCode
        }
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(getPlayers(data));
        return data;
    }
}

const initState = {};

function playersReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_PLAYERS:
            newState = {...state};
            newState
        default:
            return state;
    }
}

export default playersReducer;