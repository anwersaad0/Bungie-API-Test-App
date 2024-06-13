const apiKey = import.meta.env.VITE_API_KEY;

const GET_D2_PROFILE = "/GET_D2_PROFILE";

const getProfile = (profile) => ({
    type: GET_D2_PROFILE,
    profile,
})

export const getD2Profile = (memId) => async (dispatch) => {
    //console.log('api key there?', apiKey);

    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/3/Profile/${memId}/?components=100,200,205`, {
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

const initState = {};

function bungieReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_D2_PROFILE:
            newState = {...state}
            newState[action.profile] = action.profile;
            return newState;
        default:
            return state;
    }
}

export default bungieReducer;