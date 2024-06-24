import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import './HomePage.css';

// import { DefinitionsProvider, verbose, setApiKey, loadDefs, getInventoryItemDef, getInventoryItemLiteDef, getAllInventoryItemLiteDefs, includeTables, getPlugSetDef } from '@d2api/manifest-react';

// import { getProfile, getCharacter, getVendor, BungieMembershipType, DestinyComponentType, SocketPlugSources } from "bungie-api-ts/destiny2";
// import { getBungieNetUserById, getMembershipDataForCurrentUser } from "bungie-api-ts/user";

// verbose();

// includeTables(["InventoryItem", "InventoryItemLite", "PlugSet"]);

// setApiKey(import.meta.env.VITE_API_KEY);

// loadDefs();

function HomePage() {

    return (

        <main className="homepage-root">

            <div className="homepage-container">

                <div className="homepage-header">
                    <h1>Welcome to LFPeek</h1>
                    <h2>A Destiny 2 Profile and Item Inspector</h2>
                </div>

                <div>
                    Get started by looking up a player or an item
                </div>

                <div>


                </div>

            </div>

        </main>

    )
}


export default HomePage;