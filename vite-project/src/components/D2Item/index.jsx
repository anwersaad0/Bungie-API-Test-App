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
} from '@d2api/manifest-react';

verbose();
includeTables(["InventoryItemLite", "PlugSet"]);
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

                    <div className="perk-pool-container">

                        <DefinitionsProvider fallback={fallback}>

                            <div className="perk-pool-columns">

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[0]?.reusablePlugSetHash} />

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[1]?.randomizedPlugSetHash} />

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[2]?.randomizedPlugSetHash} />

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[3]?.randomizedPlugSetHash} />

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[4]?.randomizedPlugSetHash} />

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[8]?.reusablePlugSetHash} />

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
                <div>

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

export default D2Item;