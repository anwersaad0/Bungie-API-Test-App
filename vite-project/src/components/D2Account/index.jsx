import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getD2CurrentUser } from "../../store/bungie-account-routes";
import { CLASS_LIST, RACE_LIST } from "../D2Profile/characterNumbers";
import './D2Account.css';
import { getD2AuthProfile } from "../../store/bungie-auth-profile-routes";

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
includeTables(["InventoryItemLite", "SandboxPerk", "EquipmentSlot"]);
setApiKey(import.meta.env.VITE_API_KEY);
loadDefs();

function D2Account() {
    if (!localStorage.getItem("token")) {
        return (
            <main className="account-page-root no-account">

                <div className="no-account-message">

                    Pardon our dust, but it looks like you're not signed in.

                </div>

            </main>
        )
    }

    const dispatch = useDispatch();
    const fallback = <b>Loading Account Details...</b>;

    const account = useSelector((state) => state.account["[object Object]"]);

    useEffect(() => {
        dispatch(getD2CurrentUser(JSON.parse(localStorage.getItem("token")).access_token));
    }, [dispatch]);

    return (

        <main className="account-page-root">

            <DefinitionsProvider fallback={fallback}>

                <div className="account-page-container">

                    <div className="account-page-header-container">
                        {account?.Response?.bungieNetUser?.uniqueName}
                    </div>

                    <div>
                        <D2AccountDetails memType={account?.Response?.destinyMemberships[0]?.membershipType} memId={account?.Response?.destinyMemberships[0]?.membershipId} token={JSON.parse(localStorage.getItem("token")).access_token} />
                    </div>

                    <div>

                        <div>

                        </div>

                    </div>

                </div>

            </DefinitionsProvider>

        </main>

    )

}

function D2AccountDetails({ memType, memId, token }) {
    const dispatch = useDispatch();

    const accountProfile = useSelector((state) => state.authProfile["[object Object]"]);

    useEffect(() => {
        dispatch(getD2AuthProfile(memType, memId, token));
    }, [memType, memId, token, dispatch]);

    const characterList = (accountProfile ? Object.values(accountProfile?.Response?.characters?.data) : []);
    const characterGear = (accountProfile ? Object.values(accountProfile?.Response?.characterEquipment?.data) : []);

    const characterZip = (accountProfile ? characterList.map((x, i) => [x, characterGear[i]]) : []);

    console.log("accProf", accountProfile);

    return (
        <div className="account-details-root">

            <div className="account-details-container">

                {characterZip.map(([character, equippedGear]) => (
                    <div className="account-character-container">

                        <div>

                            <img src={`https://www.bungie.net${character?.emblemBackgroundPath}`} ></img>

                            <div >
                                {RACE_LIST[character?.raceType]} {CLASS_LIST[character?.classType]} {character?.light}
                            </div>

                        </div>

                        <div>

                            <div>

                            </div>

                            <div>

                                <div>
                                    <EquippedItem itemHash={equippedGear?.items[0]?.itemHash} />
                                </div>

                                <div>
                                    <EquippedItem itemHash={equippedGear?.items[1]?.itemHash} />
                                </div>

                                <div>
                                    <EquippedItem itemHash={equippedGear?.items[2]?.itemHash} />
                                </div>

                            </div>

                            <div>

                                <EquippedItem itemHash={equippedGear?.items[3]?.itemHash} />
                                <EquippedItem itemHash={equippedGear?.items[4]?.itemHash} />
                                <EquippedItem itemHash={equippedGear?.items[5]?.itemHash} />
                                <EquippedItem itemHash={equippedGear?.items[6]?.itemHash} />
                                <EquippedItem itemHash={equippedGear?.items[7]?.itemHash} />

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

function D2AccountInv() {

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

export default D2Account