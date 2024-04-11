const CREATE_AUTH = "/CREATE_AUTH";

const createAuth = (auth) => ({
    type: CREATE_AUTH,
    payload: auth,
})

// const getItem = (item) => ({
//     payload: item,
// });

export const bungieAuthenticate = () => async (dispatch) => {
    await fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'client_id': "{my-client-id}",
            'grant_type': "authorization_code",
            'code': authCode
        }).toString()
    })
}

const initState = {};

export default function reducer(state = initState, action) {

}