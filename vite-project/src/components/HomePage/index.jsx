import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import './HomePage.css';

const authCodeQuery = window.location.search;
const urlParams = new URLSearchParams(authCodeQuery);
export const authCodeParam = urlParams.get('code');

function HomePage() {

    console.log('code', authCodeParam);
    console.log('code type', typeof authCodeParam);

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

            </div>

        </main>

    )
}


export default HomePage;