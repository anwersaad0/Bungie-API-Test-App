import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPlayersByName, getPlayerByDisplayParams } from "../../store/bungie_player_routes";

import './D2PlayerSearch.css';
import altIcon from './altIcon/destinyIcon.png';

function D2PlayerSearch() {
    const dispatch = useDispatch();

    const [playerList, setPlayerList] = useState([]);
    const [playerAdvList, setPlayerAdvList] = useState([]);

    const [username, setUsername] = useState('');
    const [nameCode, setNameCode] = useState('');

    const [showSearch, setShowSearch] = useState(false);
    const [showAdvSearch, setShowAdvSearch] = useState(false);

    const searchClass = "search-div" + (showSearch ? "": " hidden");
    const advSearchClass = "adv-search-div" + (showAdvSearch ? "": " hidden");

    useEffect(() => {
        //this is here to ensure the search result elements do hide when needed
    }, [showSearch, showAdvSearch, dispatch]);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!username) return;

        const players = await dispatch(getPlayersByName(username));
        setPlayerList(players?.Response?.searchResults);

        setShowAdvSearch(false);
        setShowSearch(true);

    }

    const handleDetailedSearch = async (e) => {
        e.preventDefault();

        if (!username || !nameCode) return;

        const playerAdv = await dispatch(getPlayerByDisplayParams(username, nameCode));
        setPlayerAdvList(playerAdv?.Response);
        
        setShowSearch(false);
        setShowAdvSearch(true);

    }

    //console.log('players response', playerList);
    //console.log('player advanced', playerAdvList);

    return (
        <main>

            <div className="containers-search-ui">

                <div>
                    <h1>Search Player</h1>
                    <h3>To use Search Advanced, type in both the username and the display code</h3>
                </div>

                <div className="search-input-container">

                    <input
                        placeholder="Enter Player Username"
                        onChange={e => setUsername(e.target.value)}
                        className="player-search"
                    ></input>

                    <input
                        type="number"
                        placeholder="Enter Code (ex. ####)"
                        onChange={e => setNameCode(e.target.value)}
                        className="number-search"
                    ></input>

                </div>

                <div>

                    <button className="player-search-submit" type="submit" onClick={e => handleSearch(e)}>Search</button>

                    <button className="player-adv-search-submit" type="submit" onClick={e => handleDetailedSearch(e)}>Search Advanced</button>

                </div>

            </div>

            <div className="containers-search">

                <div className="search-container">

                    <div className={searchClass}>

                        <div>

                            {playerList.map(({bungieGlobalDisplayName, bungieGlobalDisplayNameCode, destinyMemberships}) => (
                                <div className="player-container">

                                    <div>
                                        <img className="search-profile-image" src={((destinyMemberships[0]?.iconPath !== undefined) ? `https://www.bungie.net${destinyMemberships[0]?.iconPath}` : altIcon)} ></img>
                                    </div>

                                    <div className="player-name">{bungieGlobalDisplayName}#{String(bungieGlobalDisplayNameCode).padStart(4, '0')}</div>

                                    <div className="player-nav">
                                        <NavLink to={`/profile/${destinyMemberships[0]?.membershipId}`}>View Player</NavLink>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

                <div className="adv-search-container">

                    <div className={advSearchClass}>

                        <div>

                            {playerAdvList.map(({iconPath, membershipId, bungieGlobalDisplayName, bungieGlobalDisplayNameCode}) => (
                                
                                <div className="player-container">

                                    <div>

                                        <img className="search-profile-image" src={((iconPath !== undefined) ? `https://www.bungie.net${iconPath}` : altIcon)} ></img>

                                    </div>

                                    <div className="player-name">{bungieGlobalDisplayName}#{String(bungieGlobalDisplayNameCode).padStart(4, '0')}</div>

                                    <div className="player-nav">
                                        <NavLink to={`/profile/${membershipId}`}>View Player</NavLink>
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </main>
    )
}

export default D2PlayerSearch;