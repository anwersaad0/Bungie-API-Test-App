import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getD2CurrentUser } from "../../store/bungie-account-routes";
import './D2Account.css';

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
import { getD2AccountProfile } from "../../store/bungie_profile_routes";

verbose();
includeTables(["InventoryItemLite", "SandboxPerk", "EquipmentSlot"]);
setApiKey(import.meta.env.VITE_API_KEY);
loadDefs();

function D2Account() {
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
                        <D2AccountDetails memType={account?.Response?.destinyMemberships[0]?.membershipType} memId={account?.Response?.destinyMemberships[0]?.membershipId} token={JSON.parse(localStorage.getItem("token")).access_token}/>
                    </div>

                    <div>

                    </div>

                </div>

            </DefinitionsProvider>

        </main>

    )

}

function D2AccountDetails({ memType, memId, token }) {
    const dispatch = useDispatch();

    const accountProfile = useSelector((state) => state.bungieData["[object Object]"]);

    useEffect(() => {
        dispatch(getD2AccountProfile(memType, memId, token));
    }, [memType, memId, token, dispatch]);

    console.log("accProf", accountProfile);

    return (
        <div className="account-details-root">

            <div>

                <p>testing</p>

            </div>

        </div>
    );
}

export default D2Account