// const CREATE_AUTH = "/CREATE_AUTH";
const GET_D2_PROFILE = "/GET_D2_PROFILE";

//extra bungie API params here?

// var tokenData = undefined;
// if (window.location.href.includes("code=")) {
//   fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
//     method: 'POST',
//     headers: {
//       'X-API-Key': apiKey,
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': `Basic ${window.btoa(`${clientId}:${clientSecret}`)}`
//     },
//     body: new URLSearchParams({
//       'client_id': clientId,
//       'grant_type': "authorization_code",
//       'code': authCode
//     }).toString()
//   }).then(function(response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function(data) {
//     tokenData = data;
//     console.log(data);
//   })
// }


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

export const getD2Profile = () => async (dispatch) => {
    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018483417802/?components=200`);

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
        default:
            return state;
    }
}

export default bungieReducer;