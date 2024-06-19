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

                <div>
                    
                </div>



            </div>

        </main>
    )
}

function ItemPerks({plugSetHash}) {
    const plugSetDefs = getPlugSetDef(plugSetHash);

    return (
        <div>

            {plugSetDefs?.reusablePlugItems.map(({plugItemHash}) => (
                <div>

                    <DefinePerk perkHash={plugItemHash} />

                </div>
            ))}

        </div>
    )
}

function DefinePerk({perkHash}) {
    const perk = getInventoryItemLiteDef(perkHash);
    const perkIcon = perk?.displayProperties.icon;

    return (
        <div className="perk-icon-container">
            <img className="perk-icon" src={`https://www.bungie.net${icon}`}></img>
        </div>
    )
}

export default D2Item;