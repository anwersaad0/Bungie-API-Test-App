const apiKey = import.meta.env.VITE_API_KEY;

const GET_D2_PROFILE = "/GET_D2_PROFILE";
const GET_ACCOUNT_PROFILE = "/GET_ACCOUNT_PROFILE";

const getProfile = (profile) => ({
    type: GET_D2_PROFILE,
    profile,
})

const getAccProfile = (profile) => ({
    type: GET_ACCOUNT_PROFILE,
    profile
})

export const getD2Profile = (memType, memId) => async (dispatch) => {
    //console.log('api key there?', apiKey);

    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/${memType}/Profile/${memId}/?components=100,200,205,302`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey
        },
    });

    if (res.ok) {
        const data = await res.json()
        await dispatch(getProfile(data));
        return data;
    }
}

export const getD2AccountProfile = (memType, memId, token) => async (dispatch) => {
    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/${memType}/Profile/${memId}/?components=100,200,201,205,302,304`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
            "Authorization": `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const data = await res.json();
        await dispatch(getAccProfile(data));
        return data;
    }
}

const initState = {};

function bungieReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_D2_PROFILE:
            newState = {...state}
            newState[action.profile] = action.profile;
            return newState;
        case GET_ACCOUNT_PROFILE:
            newState = {...state}
            newState[action.profile] = action.profile;
            return newState;
        default:
            return state;
    }
}

export default bungieReducer;