import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getD2Item } from "../../store/bungie_item_routes";
import { useParams } from "react-router-dom";
import { STAT_LIST } from "./statNumbers";
import { ARMOR_INTRINSIC_SOCKETS } from "./intrinsicNumbers";
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
} from '@d2api/manifest-react';

verbose();
includeTables(["InventoryItemLite", "PlugSet", "Stat"]);
setApiKey(import.meta.env.VITE_API_KEY);
loadDefs();

function D2Item() {
    const dispatch = useDispatch();
    const { itemHash } = useParams();

    const fallback = <b>Loading perks...</b>;

    const item = useSelector((state) => state.bungieItemData['[object Object]'])

    useEffect(() => {
        dispatch(getD2Item(itemHash));
    }, [itemHash, dispatch]);

    //console.log('item', item);

    const checkArmor = () => {
        if (item?.Response?.traitIds?.some(str => str.includes('item.armor.')) && item?.Response?.itemTypeAndTierDisplayName?.includes('Exotic')) {
            const intrinsicHash = ExoticArmorIntrinsic(item);

            return (
                <div className="intrinsic-archetype-root">

                    <h1 className="inspect-item-body-title">Archtype/Intrinsic</h1>

                    <div>
                        <ItemPerks plugSetHash={intrinsicHash} />
                    </div>

                </div>
            )
        } return;
    }

    const checkWeapon = () => {
        if (item?.Response?.traitIds && item?.Response?.traitIds?.some(str => str.includes('item.weapon.'))) {
            return (
                <>

                    <div className="intrinsic-archetype-root">

                        <h1 className="inspect-item-body-title">Archtype/Intrinsic</h1>

                        <div>
                            <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[0]?.reusablePlugSetHash} />
                        </div>

                    </div>

                    <div className="stats-and-perk-pool-root">

                        <h1 className="inspect-item-body-title">Stats & Perks</h1>

                        <div className="stats-and-perk-pool-container">

                            <div className="stats-container">

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Swing Speed"]] ? (`Swing Speed: ${item?.Response?.stats?.stats[STAT_LIST["Swing Speed"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Impact"]] ? (`Impact: ${item?.Response?.stats?.stats[STAT_LIST["Impact"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Blast Radius"]] ? (`Blast Radius: ${item?.Response?.stats?.stats[STAT_LIST["Blast Radius"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Range"]] ? (`Range: ${item?.Response?.stats?.stats[STAT_LIST["Range"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Velocity"]] ? (`Velocity: ${item?.Response?.stats?.stats[STAT_LIST["Velocity"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Stability"]] ? (`Stability: ${item?.Response?.stats?.stats[STAT_LIST["Stability"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Shield Duration"]] ? (`Shield Duration: ${item?.Response?.stats?.stats[STAT_LIST["Shield Duration"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Handling"]] ? (`Handling: ${item?.Response?.stats?.stats[STAT_LIST["Handling"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Guard Efficiency"]] ? (`Guard Efficiency: ${item?.Response?.stats?.stats[STAT_LIST["Guard Efficiency"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Reload Speed"]] ? (`Reload Speed: ${item?.Response?.stats?.stats[STAT_LIST["Reload Speed"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Guard Resistance"]] ? (`Guard Resistance: ${item?.Response?.stats?.stats[STAT_LIST["Guard Resistance"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Aim Assistance"]] ? (`Aim Assistance: ${item?.Response?.stats?.stats[STAT_LIST["Aim Assistance"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Inventory Size"]] ? (`Inventory Size: ${item?.Response?.stats?.stats[STAT_LIST["Inventory Size"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Zoom"]] ? (`Zoom: ${item?.Response?.stats?.stats[STAT_LIST["Zoom"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Airborne Effectiveness"]] ? (`Airborne Effectiveness: ${item?.Response?.stats?.stats[STAT_LIST["Airborne Effectiveness"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Recoil"]] ? (`Recoil: ${item?.Response?.stats?.stats[STAT_LIST["Recoil"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Rounds Per Minute"]] ? (`Rounds Per Minute: ${item?.Response?.stats?.stats[STAT_LIST["Rounds Per Minute"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Charge Time"]] ? (`Charge Time: ${item?.Response?.stats?.stats[STAT_LIST["Charge Time"]]?.value}`) : "")}
                                </div>

                                <div className="stat-container">
                                    {(item?.Response?.stats?.stats[STAT_LIST["Magazine"]] ? (`Magazine: ${item?.Response?.stats?.stats[STAT_LIST["Magazine"]]?.value}`) : "")}
                                </div>

                            </div>

                            <div className="perk-pool-columns-container">

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[1]?.randomizedPlugSetHash} />

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[2]?.randomizedPlugSetHash} />

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[3]?.randomizedPlugSetHash} />

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[4]?.randomizedPlugSetHash} />

                                <ItemPerks plugSetHash={item?.Response?.sockets?.socketEntries[8]?.reusablePlugSetHash} />

                            </div>

                        </div>

                    </div>
                </>
            )
        } else return;
    }

    return (
        <main>

            <div className="inspect-item-container">

                <div className="inspect-item-header-root">

                    <div className="inspect-item-header">

                        <div>



                            <img
                                src={`https://www.bungie.net${item?.Response?.displayProperties?.icon}`}
                                alt={`https://www.bungie.net${item?.Response?.displayProperties?.name}`}
                            ></img>

                        </div>

                        <div className="inspect-item-titles">

                            <h1 className="item-title">
                                {item?.Response?.displayProperties?.name}
                            </h1>

                            <h2 className="item-subtitle">
                                {item?.Response?.itemTypeAndTierDisplayName}
                            </h2>

                        </div>

                    </div>

                    <div>
                        {item?.Response?.flavorText}
                    </div>

                </div>

                <div className="inspect-item-body">

                    <div className="item-details-container">

                        <DefinitionsProvider fallback={fallback}>

                            {checkArmor()}

                            {checkWeapon()}

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

    if (perk?.itemTypeDisplayName?.includes("Enhanced")) {
        return;
    } else if (perk?.itemTypeDisplayName?.includes("Intrinsic")) {
        //console.log('perk', perk);

        return (
            <div className="intrinsic-archetype-container">
                <div className="intrinsic-archetype-icon-title">
                    <img className="perk-icon" src={`https://www.bungie.net${perkIcon}`}></img>
                    <div className="perk-name">{perk?.displayProperties?.name}</div>
                </div>

                <div className="intrinsic-archetype-description">
                    {perk?.displayProperties?.description}
                </div>
            </div>
        )
    }

    return (
        <div className="perk-icon-container">
            <img className="perk-icon" src={`https://www.bungie.net${perkIcon}`}></img>
        </div>
    )
}

function ExoticArmorIntrinsic(item) {
    for (let socketEntry of item?.Response?.sockets?.socketEntries) {
        if (ARMOR_INTRINSIC_SOCKETS.includes(socketEntry?.socketTypeHash)) {
            return socketEntry?.reusablePlugSetHash;
        }
    }
}

// function WeaponStats({ statHash }) {
//     const stat = getStatDef(statHash);
//     //console.log('stat', stat);

//     return (
//         <div>

//             {stat?.displayProperties?.name}

//         </div>
//     )
// }

export default D2Item;