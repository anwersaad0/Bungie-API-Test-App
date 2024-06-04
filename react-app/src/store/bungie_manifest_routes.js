const apiKey = process.env.REACT_APP_API_KEY;

const GET_D2_MANIFEST = "/GET_D2_MANIFEST";
const GET_DEFINITIONS = "/GET_DEFINITIONS";

const getManifest = (manifest) => ({
    type: GET_D2_MANIFEST,
    manifest
});

const getDefinitions = (defs) => ({
    type: GET_DEFINITIONS,
    defs
})

export const getD2Manifest = () => async (dispatch) => {
    const res = await fetch('https://www.bungie.net/Platform/Destiny2/Manifest');

    if (res.ok) {
        const data = await res.json();
        dispatch(getManifest(data));
    }
};

export const getJsonDefinitions = () => async (dispatch) => {
    const res = await fetch('https://www.bungie.net/common/destiny2_content/json/en/aggregate-04f359b1-4103-42a1-a9e1-dc398e1f079e.json');

    if (res.ok) {
        const data = await res.json();
        console.log('data', data);
        dispatch(getDefinitions(data));
    }
}

const initState = {};

function manifestReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_D2_MANIFEST:
            newState = {...state}
            newState[action.manifest] = action.manifest;
            return newState;
        case GET_DEFINITIONS:
            newState = {...state}
            newState[action.defs] = action.defs;
            return newState;
        default:
            return state;
    }
}

export default manifestReducer;