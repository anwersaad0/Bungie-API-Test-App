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
    includeTables,
} from '@d2api/manifest-react';

verbose();
includeTables(["InventoryItemLite"]);
setApiKey(import.meta.env.VITE_API_KEY);
loadDefs();

function D2Profile() {
    const dispatch = useDispatch();
    //const {memId} = useParams();
    const fallback = <b>Loading equipped gear...</b>;

    const profile = useSelector((state) => state.bungieData["[object Object]"]);

    useEffect(() => {
        dispatch(getD2Profile());
    }, [dispatch]);

    const characterList = (profile ? Object.values(profile?.Response?.characters?.data) : []);
    const characterGear = (profile ? Object.values(profile?.Response?.characterEquipment?.data) : []);

    const characterZip = (profile ? characterList.map((x, i) => [x, characterGear[i]]) : []);

    console.log('profile', characterZip);

    return (
        <main>

            <div className="container-profile-page">

                {profile ? (

                    <div>

                        <div className="profile-username-container">
                            Username: {profile?.Response?.profile?.data?.userInfo?.displayName}#{profile?.Response?.profile?.data?.userInfo?.bungieGlobalDisplayNameCode}
                        </div>

                        <div className="profile-character-container">

                            <div>

                                {characterZip.map(([character, equippedGear]) => (
                                    <div>

                                        <img src={`https://www.bungie.net${character?.emblemBackgroundPath}`}></img>

                                        <div>
                                            {RACE_LIST[character?.raceType]} {CLASS_LIST[character?.classType]} {character?.light}
                                        </div>

                                        <div className="equipped-container">

                                            <DefinitionsProvider fallback={fallback}>

                                                <div className="equipped-inner-container">
                                                    <div className="equipped-weapons-container">

                                                        <div className="equipped-weapon-label">
                                                            Equipped Weapons
                                                        </div>

                                                        <div className="equipped-weapon-grid">
                                                            <ExampleItem itemHash={equippedGear?.items[0]?.itemHash} />
                                                            <ExampleItem itemHash={equippedGear?.items[1]?.itemHash} />
                                                            <ExampleItem itemHash={equippedGear?.items[2]?.itemHash} />
                                                        </div>
                                                    </div>

                                                    <div className="equipped-armor-container">

                                                        <div className="equipped-armor-label">
                                                            Equipped Armor
                                                        </div>

                                                        <div className="equipped-armor-grid">
                                                            <ExampleItem itemHash={equippedGear?.items[3]?.itemHash} />
                                                            <ExampleItem itemHash={equippedGear?.items[4]?.itemHash} />
                                                            <ExampleItem itemHash={equippedGear?.items[5]?.itemHash} />
                                                            <ExampleItem itemHash={equippedGear?.items[6]?.itemHash} />
                                                            <ExampleItem itemHash={equippedGear?.items[7]?.itemHash} />
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

//This doesn't work rn, issues with iteration
function CharacterInv({ itemHashes }) {
    const items = [];
    const icons = [];

    for (let itemHash of itemHashes) {
        const item = getInventoryItemLiteDef(itemHash);
        items.push(item);
        icons.push(item?.displayProperties.icon);
    }

    //const item = getInventoryItemDef(itemHash);
    //const icon = item?.displayProperties.icon;

    return (
        <>
            {items.map(([displayProperties]) => (
                <div>
                    <img src={`https://www.bungie.net${displayProperties?.icon}`}></img>
                </div>
            ))}
        </>
    )
}

//This does work rn tho lmao
function ExampleItem({ itemHash }) {
    const exampleWep = getInventoryItemLiteDef(itemHash);
    const icon = exampleWep?.displayProperties.icon;

    return (
        <div className="item-icon-container">
            <img className="item-icon" src={`https://www.bungie.net${icon}`}></img>
        </div>
    )
}

export default D2Profile;