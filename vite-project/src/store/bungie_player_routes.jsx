const apiKey = import.meta.env.VITE_API_KEY;

const GET_PLAYERS = "/GET_PLAYERS";
const GET_PLAYER_DETAILED = "/GET_PLAYER_DETAILED";

const getPlayers = (players) => ({
    type: GET_PLAYERS,
    players,
});

const getPlayerDetailed = (player) => ({
    type: GET_PLAYER_DETAILED,
    player,
})

export const getPlayersByName = (playerName) => async (dispatch) => {
    const res = await fetch("https://www.bungie.net/Platform/User/Search/GlobalName/0/", {
        method: "POST",
        headers: {
            "X-API-Key": apiKey
        },
        body: JSON.stringify({ "displayNamePrefix": playerName })
    });

    if (res.ok) {
        const data = await res.json();
        await dispatch(getPlayers(data));
        return data;
    }
}

export const getPlayerByDisplayParams = (playerName, playerCode) => async (dispatch) => {
    const res = await fetch("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/All/", {
        method: "POST",
        headers: {
            "X-API-Key": apiKey
        },
        body: JSON.stringify({
            "displayName": playerName,
            "displayNameCode": playerCode
        })
    });

    if (res.ok) {
        const data = await res.json();
        await dispatch(getPlayerDetailed(data));
        return data;
    }
}

const initState = {};

function playersReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_PLAYERS:
            newState = {...state};
            newState[action.players] = action.players;
            return newState;
        case GET_PLAYER_DETAILED:
            newState = {...state};
            newState[action.player] = action.player;
            return newState;
        default:
            return state;
    }
}

export default playersReducer;