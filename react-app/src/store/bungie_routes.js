const CREATE_AUTH = "/CREATE_AUTH";
const GET_D2_PROFILE = "/GET_D2_PROFILE";

const createAuth = (auth) => ({
    type: CREATE_AUTH,
    payload: auth,
})

const getProfile = (profile) => ({
    type: GET_D2_PROFILE,
    payload: profile,
})

// const getItem = (item) => ({
//     payload: item,
// });

export const bungieAuthenticate = () => async (dispatch) => {
    const res = await fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${null}`
        },
        body: JSON.stringify({
            'client_id': "{my-client-id}",
            'grant_type': "authorization_code",
            'code': authCode
        })
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(createAuth(data));
    }
}

export const getD2Profile = (memType, memId) => async (dispatch) => {
    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/${memType}/${memId}`)

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
            newState[action.profile] = action.profile;
            return newState;
    }
}

export default bungieReducer;