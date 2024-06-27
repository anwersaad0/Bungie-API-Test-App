const apiKey = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;

const GET_AUTH = "/GET_AUTH";

const getAuth = (auth) => ({
    type: GET_AUTH,
    auth,
})

export const getBungieAuth = () => async (dispatch) => {
    const res = await fetch(`https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code`);

    if (res.ok) {
        
    }
}