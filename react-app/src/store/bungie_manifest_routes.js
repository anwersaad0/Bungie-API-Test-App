const apiKey = process.env.REACT_APP_API_KEY;

const GET_D2_MANIFEST = "/GET_D2_MANIFEST";

const getManifest = (manifest) => ({
    type: GET_D2_MANIFEST,
    manifest
});

export const getD2Manifest = () => async (dispatch) => {
    const res = await fetch('https://www.bungie.net/Platform/Destiny2/Manifest');

    if (res.ok) {
        const data = await res.json();
        dispatch(getManifest(data));
    }
};

const initState = {};

function manifestReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        default:
            return state;
    }
}