import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getJsonDefinitions } from "../../store/bungie_manifest_routes";

import { DefinitionsProvider, verbose, setApiKey, loadDefs, getInventoryItemDef, getInventoryItemLiteDef, getAllInventoryItemLiteDefs, includeTables,} from '@d2api/manifest-react';

import { getProfile, getCharacter, getVendor, BungieMembershipType, DestinyComponentType } from "bungie-api-ts/destiny2";
import { getBungieNetUserById, getMembershipDataForCurrentUser } from "bungie-api-ts/user";

verbose();

includeTables(["InventoryItem", "InventoryItemLite"]);

setApiKey(import.meta.env.VITE_API_KEY);

loadDefs();

function HomePage() {
    const fallback = <b>Loading example...</b>;

    return (

        <>

            <h1>well?</h1>

            <DefinitionsProvider fallback={fallback}>

                <ExampleItem itemHash={2575506895} />

            </DefinitionsProvider>

        </>

    )
}

function ExampleItem({itemHash}) {
    const exampleWep = getInventoryItemLiteDef(itemHash);
    const icon = exampleWep?.displayProperties.icon; 

    return (
        <>
            <img src={`https://www.bungie.net${icon}`}></img>
        </>
    )
}

export default HomePage;