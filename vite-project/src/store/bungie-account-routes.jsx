const apiKey = import.meta.env.VITE_API_KEY;

const GET_AUTHORIZED_ACCOUNT = "/GET_AUTHORIZED_ACCOUNT";

const getAuthAccount = (account) => ({
    type: GET_AUTHORIZED_ACCOUNT,
    account
})

export const getD2CurrentUser = (token) => async (dispatch) => {
    const res = await fetch('https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser', {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
            "Authorization": `Bearer ${token}`
        }
    });

    if (res.ok) {
        const data = await res.json();
        await dispatch(getAuthAccount(data));
        return data;
    }
}

const initState = {};

function accountReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_AUTHORIZED_ACCOUNT:
            newState = {...state}
            newState[action.account] = action.account;
            return newState;
        default:
            return state;
    }
}

export default accountReducer;