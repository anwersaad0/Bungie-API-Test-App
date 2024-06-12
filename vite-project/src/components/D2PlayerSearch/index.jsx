import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPlayersByName, getPlayerByDisplayParams } from "../../store/bungie_player_routes";

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

        //console.log('username', username);

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

    console.log('players response', playerList);
    console.log('player advanced', playerAdvList);

    return (
        <main>

            <div className="containers-search-ui">

                <div>
                    <h1>Search Player</h1>
                    <h3>To use Search Advanced, type in both the username and the display code</h3>
                </div>

                <div>

                    <input
                        placeholder="Enter Player Name"
                        onChange={e => setUsername(e.target.value)}
                        className="player-search"
                    ></input>

                    <input
                        type="number"
                        onChange={e => setNameCode(e.target.value)}
                        className="number-search"
                    ></input>

                </div>

                <div>

                    <button type="submit" onClick={e => handleSearch(e)}>Search</button>

                    <button type="submit" onClick={e => handleDetailedSearch(e)}>Search Advanced</button>

                </div>

            </div>

            <div className="containers-search">

                <div className="search-container">

                    <div className={searchClass}>
                        Testing normal search

                        <div>

                            {playerList.map(({bungieGlobalDisplayName}) => (
                                <div>

                                    <div>{bungieGlobalDisplayName}</div>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

                <div className="adv-search-container">

                    <div className={advSearchClass}>
                        Testing advanced search

                        <div>



                        </div>

                    </div>

                </div>

            </div>

        </main>
    )
}

export default D2PlayerSearch;