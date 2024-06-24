import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getD2Profile } from "../../store/bungie_profile_routes";
import { CLASS_LIST, RACE_LIST } from "./characterNumbers";
import D2Item from "../D2Item";
import './D2Profile.css';

import {
    DefinitionsProvider,
    verbose,
    setApiKey,
    loadDefs,
    getInventoryItemDef,
    getInventoryItemLiteDef,
    getSandboxPerkDef,
    includeTables,
} from '@d2api/manifest-react';

verbose();
includeTables(["InventoryItemLite", "SandboxPerk"]);
setApiKey(import.meta.env.VITE_API_KEY);
loadDefs();

function D2Profile() {
    const dispatch = useDispatch();
    const { memId } = useParams();
    const fallback = <b>Loading equipped gear...</b>;

    const profile = useSelector((state) => state.bungieData["[object Object]"]);

    useEffect(() => {
        dispatch(getD2Profile(memId));
    }, [memId, dispatch]);

    const characterList = (profile ? Object.values(profile?.Response?.characters?.data) : []);
    const characterGear = (profile ? Object.values(profile?.Response?.characterEquipment?.data) : []);

    const characterZip = (profile ? characterList.map((x, i) => [x, characterGear[i]]) : []);

    //console.log('profile', characterZip);

    return (
        <main className="progile-page-root">

            <div className="container-profile-page">

                {profile ? (

                    <div>

                        <div className="profile-username-container">
                            {profile?.Response?.profile?.data?.userInfo?.displayName}#{profile?.Response?.profile?.data?.userInfo?.bungieGlobalDisplayNameCode}
                        </div>

                        <div className="profile-character-container">

                            <div>

                                {characterZip.map(([character, equippedGear]) => (
                                    <div className="character-container">

                                        <div className="character-header">

                                            <img className="character-emblem" src={`https://www.bungie.net${character?.emblemBackgroundPath}`}></img>

                                            <div className="character-description">
                                                {RACE_LIST[character?.raceType]} {CLASS_LIST[character?.classType]} {character?.light}
                                            </div>

                                        </div>

                                        <div className="equipped-container">

                                            <DefinitionsProvider fallback={fallback}>

                                                <div className="equipped-inner-container">
                                                    <div className="equipped-weapons-container">

                                                        <div className="equipped-gear-label">
                                                            Equipped Weapons
                                                        </div>

                                                        <div className="equipped-weapon-grid">

                                                            <div>
                                                                <EquippedItem itemHash={equippedGear?.items[0]?.itemHash} />

                                                                <div className="equipped-item-perks">
                                                                    {profile?.Response?.itemComponents?.perks?.data[equippedGear?.items[0]?.itemInstanceId]?.perks?.map(({ perkHash }) => (
                                                                        <div>
                                                                            <ActivePerk perkHash={perkHash} />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <EquippedItem itemHash={equippedGear?.items[1]?.itemHash} />

                                                                <div className="equipped-item-perks">
                                                                    {profile?.Response?.itemComponents?.perks?.data[equippedGear?.items[1]?.itemInstanceId]?.perks?.map(({ perkHash }) => (
                                                                        <div>
                                                                            <ActivePerk perkHash={perkHash} />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <EquippedItem itemHash={equippedGear?.items[2]?.itemHash} />

                                                                <div className="equipped-item-perks">
                                                                    {profile?.Response?.itemComponents?.perks?.data[equippedGear?.items[2]?.itemInstanceId]?.perks?.map(({ perkHash }) => (
                                                                        <div>
                                                                            <ActivePerk perkHash={perkHash} />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="equipped-armor-container">

                                                        <div className="equipped-gear-label">
                                                            Equipped Armor
                                                        </div>

                                                        <div className="equipped-armor-grid">
                                                            <EquippedItem itemHash={equippedGear?.items[3]?.itemHash} />
                                                            <EquippedItem itemHash={equippedGear?.items[4]?.itemHash} />
                                                            <EquippedItem itemHash={equippedGear?.items[5]?.itemHash} />
                                                            <EquippedItem itemHash={equippedGear?.items[6]?.itemHash} />
                                                            <EquippedItem itemHash={equippedGear?.items[7]?.itemHash} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </DefinitionsProvider>

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                ) : (

                    <div>

                        <div> Fetching Data... </div>

                    </div>
                )}

            </div>

        </main>
    )
}

function EquippedItem({ itemHash }) {
    const exampleWep = getInventoryItemLiteDef(itemHash);
    const icon = exampleWep?.displayProperties.icon;

    return (
        <div className="item-icon-container">
            <img className="item-icon" src={`https://www.bungie.net${icon}`}></img>
            <div className="item-name">{exampleWep?.displayProperties?.name}</div>
        </div>
    )
}

function ActivePerk({ perkHash }) {
    const perk = getSandboxPerkDef(perkHash);
    const icon = perk?.displayProperties?.icon;
    //console.log(`${perk?.displayProperties?.name}`, perk);

    return (
        <div>
            {icon ? (
                <img className="active-perk-icon" src={`https://www.bungie.net${icon}`}></img>
            ) : (
                <div></div>
            )}

        </div>
    )
}

export default D2Profile;