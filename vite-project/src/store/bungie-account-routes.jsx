const apiKey = import.meta.env.VITE_API_KEY;

const GET_AUTHORIZED_ACCOUNT = "/GET_AUTHORIZED_ACCOUNT";

const getAuthAccount = (account) => ({
    type: GET_AUTHORIZED_ACCOUNT,
    account
})

export const getD2AuthAccount = (memType, memId, token) => async (dispatch) => {
    const res = await fetch(`https://www.bungie.net/Platform/Destiny2/${memType}/Profile/${memId}/?components=100,200,205,302`, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
            "Authorization": token,
        },
    });

    if (res.ok) {
        const data = await res.json();
        await dispatch(getAuthAccount(data));
        return data;
    }
}

const initState = {};