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

verbose();

setApiKey(import.meta.env.VITE_API_KEY)

function D2Account() {
    const dispatch = useDispatch();

    const account = useSelector((state) => state.account["[object Object]"]);

    useEffect(() => {
        dispatch(getD2CurrentUser(JSON.parse(localStorage.getItem("token")).access_token));
    }, [dispatch]);

    console.log('account', account);

    return (

        <main className="account-page-root">

            <div className="account-page-container">

                <div className="account-page-header-container">
                    {account?.Response?.bungieNetUser?.uniqueName}
                </div>

                <div>
                    
                </div>

            </div>

        </main>

    )

}

export default D2Account