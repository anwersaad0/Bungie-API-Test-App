// const CREATE_AUTH = "/CREATE_AUTH";
const GET_D2_PROFILE = "/GET_D2_PROFILE";

//extra bungie API params here?

// const createAuth = (auth) => ({
//     type: CREATE_AUTH,
//     payload: auth,
// })

const getProfile = (profile) => ({
    type: GET_D2_PROFILE,
    payload: profile,
})

// const getItem = (item) => ({
//     payload: item,
// });

export const getD2Profile = (memId) => async (dispatch) => {
    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/3/${memId}/?components=200`);

    if (res.ok) {
        const data = await res.json()
        dispatch(getProfile(data));
    }
}

const initState = {};

function bungieReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_D2_PROFILE:
            newState = {...state}
            newState[action.profile.membershipId] = action.profile;
            return newState;
        default:
            return state;
    }
}

export default bungieReducer;