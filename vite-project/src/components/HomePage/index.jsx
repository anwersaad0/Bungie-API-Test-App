import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
//import { getJsonDefinitions } from "../../store/bungie_manifest_routes";

import { DefinitionsProvider, verbose, setApiKey, loadDefs, getInventoryItemDef, getInventoryItemLiteDef, getAllInventoryItemLiteDefs, includeTables, getPlugSetDef } from '@d2api/manifest-react';

import { getProfile, getCharacter, getVendor, BungieMembershipType, DestinyComponentType, SocketPlugSources } from "bungie-api-ts/destiny2";
import { getBungieNetUserById, getMembershipDataForCurrentUser } from "bungie-api-ts/user";

verbose();

includeTables(["InventoryItem", "InventoryItemLite", "PlugSet"]);

setApiKey(import.meta.env.VITE_API_KEY);

loadDefs();

function HomePage() {
    const fallback = <b>Loading example...</b>;

    return (

        <main>

            <div>

                <div>
                    <h1>Welcome to LFPeek</h1>
                    <h2>A Destiny 2 Profile and Item Inspector</h2>
                </div>

                <div>
                    Get started by looking up a player or an item
                </div>

                <div>

                    <DefinitionsProvider fallback={fallback}>

                        <ExamplePlugSet plugSetHash={123373618} />

                        <ExampleItem itemHash={2946784966} />

                    </DefinitionsProvider>

                </div>

            </div>

        </main>

    )
}

function ExamplePlugSet({ plugSetHash }) {
    const examplePlugSet = getPlugSetDef(plugSetHash);
    console.log("let's test this", examplePlugSet);

    return (
        <>
            <h3>eh</h3>
        </>
    )
}

function ExampleItem({ itemHash }) {
    const exampleWep = getInventoryItemLiteDef(itemHash);
    const icon = exampleWep?.displayProperties.icon;

    return (
        <div className="item-icon-container">
            <img className="item-icon" src={`https://www.bungie.net${icon}`}></img>
        </div>
    )
}


export default HomePage;