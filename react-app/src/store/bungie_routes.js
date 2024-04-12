const CREATE_AUTH = "/CREATE_AUTH";

const createAuth = (auth) => ({
    type: CREATE_AUTH,
    payload: auth,
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
    }
}

const initState = {};

export default function reducer(state = initState, action) {

}