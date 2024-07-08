import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
//import { getAuthToken } from "../../store/bungie_oauth_routes";
import { authCodeParam } from "../Navigation";
import './HomePage.css';

//const authCodeQuery = window.location.search;
//const urlParams = new URLSearchParams(authCodeQuery);
//export const authCodeParam = urlParams.get('code');

function HomePage() {
    //const dispatch = useDispatch();

    //useEffect(() => {
        //dispatch(getAuthToken(authCodeParam));
    //}, [authCodeParam, dispatch]);

    //const token = useSelector((state) => state.auth["[object Object]"]);

    //console.log('code', authCodeParam);
    //console.log('token', token);

    return (

        <main className="homepage-root">

            <div className="homepage-container">

                <div className="homepage-header">
                    <h1>Welcome to LFPeek</h1>
                    <h2>A Destiny 2 Profile and Item Inspector</h2>
                </div>

                <div className="homepage-start">
                    Get started by looking up a player or an item
                </div>

                <div>

                    {authCodeParam ? "you're logged in" : ""}

                </div>

                <div>

                    {/* {token ? "token active" : ""} */}

                </div>

            </div>

        </main>

    )
}


export default HomePage;