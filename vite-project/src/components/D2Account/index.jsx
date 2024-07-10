import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getD2CurrentUser } from "../../store/bungie-account-routes";

function D2Account() {
    const dispatch = useDispatch();

    const account = useSelector((state) => state.account["[object Object]"]);

    useEffect(() => {
        dispatch(getD2CurrentUser(JSON.parse(localStorage.getItem("token")).access_token));
    }, [token, account, dispatch]);


    return (

        <main>

            <div>

            </div>

        </main>

    )

}

export default D2Account