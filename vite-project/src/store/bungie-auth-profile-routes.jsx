const apiKey = import.meta.env.VITE_API_KEY;

const GET_AUTH_PROFILE = "/GET_AUTH_PROFILE";

const getAuthProfile = (profile) => ({
    type: GET_AUTH_PROFILE,
    profile
})

export const getD2AuthProfile = (memType, memId, token) => async (dispatch) => {
    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/${memType}/Profile/${memId}/?components=100,200,201,205,302,304`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
            "Authorization": `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const data = await res.json();
        await dispatch(getAuthProfile(data));
        return data;
    }
}

const initState = {};

function authProfileReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_AUTH_PROFILE:
            newState = {...state}
            newState[action.profile] = action.profile;
            return newState;
        default:
            return state;
    }
}

export default authProfileReducer;