import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getD2Item } from "../../store/bungie_item_routes";
import { useParams } from "react-router-dom";

import './D2Item.css';

import {
    verbose,
    includeTables,
    DefinitionsProvider,
    setApiKey,
    loadDefs,
    getPlugSetDef,
    getInventoryItemLiteDef,
    getStatDef,
    getStatGroupDef
} from '@d2api/manifest-react';

verbose();
includeTables(["InventoryItemLite", "PlugSet", "Stat", "StatGroup"]);
setApiKey(import.meta.env.VITE_API_KEY);
loadDefs();

function D2Item() {
    const dispatch = useDispatch();
    const { itemHash } = useParams();

    const fallback = <b>Loading perks...</b>;

    useEffect(() => {
        dispatch(getD2Item(itemHash));
    }, [itemHash, dispatch]);

    const item = useSelector((state) => state.bungieItemData['[object Object]'])

    console.log('item', item);

    return (
        <main>

            <div>

                <div className="inspect-item-header">

                    <div>



                        <img
                            src={`https://www.bungie.net${item?.Response?.displayProperties?.icon}`}
                            alt={`https://www.bungie.net${item?.Response?.displayProperties?.name}`}
                        ></img>

                    </div>

                    <div>

                        <h1>
                            {item?.Response?.displayProperties?.name}
                        </h1>

                        <h2>
                            {item?.Response?.itemTypeAndTierDisplayName}
                        </h2>

                    </div>

                </div>

                <div className="inspect-item-body">

                    <div className="item-details-container">

                        <DefinitionsProvider fallback={fallback}>

                            <div>Possible Perks</div>

                            <div className="stats-and-perk-pool-container">

                                <div className="stats-container">

                                    <div>Base Stats: </div>

                                    <div className="stat-container">
                                        <WeaponStats statHash={1842278586} /> : {item?.Response?.stats?.stats[1842278586]?.value}
                                    </div>

                                    <div>
                                        
                                    </div>

                                </div>

                                <div className="perk-pool-columns-container">

                                    <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[0]?.reusablePlugSetHash} />

                                    <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[1]?.randomizedPlugSetHash} />

                                    <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[2]?.randomizedPlugSetHash} />

                                    <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[3]?.randomizedPlugSetHash} />

                                    <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[4]?.randomizedPlugSetHash} />

                                    <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[8]?.reusablePlugSetHash} />

                                </div>

                            </div>

                        </DefinitionsProvider>

                    </div>

                </div>

            </div>

        </main>
    )
}

function ItemPerks({ plugSetHash }) {
    const plugSetDefs = getPlugSetDef(plugSetHash);

    return (
        <div>

            {plugSetDefs?.reusablePlugItems.map(({ plugItemHash }) => (
                <div className="perk-pool-column">

                    <DefinePerk perkHash={plugItemHash} />

                </div>
            ))}

        </div>
    )
}

function DefinePerk({ perkHash }) {
    const perk = getInventoryItemLiteDef(perkHash);
    const perkIcon = perk?.displayProperties.icon;

    if (perk?.itemTypeDisplayName.includes("Enhanced")) return;

    return (
        <div className="perk-icon-container">
            <img className="perk-icon" src={`https://www.bungie.net${perkIcon}`}></img>
        </div>
    )
}

function WeaponStats({ statHash }) {
    const stat = getStatDef(statHash);
    //console.log('stat', stat);

    return (
        <div>

            {stat?.displayProperties?.name}

        </div>
    )
}

// function WeaponStatGroup({ statGroupHash }) {
//     const statGroup = getStatGroupDef(statGroupHash);
//     console.log('statgroup', statGroup);

//     return (
//         <div>
//             hi
//         </div>
//     )
// }

export default D2Item;