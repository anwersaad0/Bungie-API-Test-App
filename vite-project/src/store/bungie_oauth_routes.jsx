const apiKey = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

const GET_AUTH = "/GET_AUTH";
const GET_TOKEN = "/GET_TOKEN";

const getAuth = (auth) => ({
    type: GET_AUTH,
    auth,
})

const getToken = (token) => ({
    type: GET_TOKEN,
    token,
})

// export const getBungieAuth = () => async (dispatch) => {
//     const res = await fetch(`https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code`);

//     if (res.ok) {
        
//     }
// }

export const getAuthToken = (code) => async (dispatch) => {
    const res = await fetch("https://www.bungie.net/Platform/App/OAuth/Token/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            "client_id": clientId,
            "client_secret": clientSecret,
            "grant_type": "authorization_code",
            "code": code,
        }).toString()
    })

    if (res.ok) {
        const data = await res.json();
        await dispatch(getToken(data));
        //console.log('token data', data);
    }
}

const initState = {};

function authReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_TOKEN:
            newState = {...state};
            newState[action.token] = action.token;
            return newState;
        default:
            return state;
    }
}

export default authReducer;