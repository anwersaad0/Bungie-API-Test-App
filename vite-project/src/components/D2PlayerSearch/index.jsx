import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPlayersByName, getPlayerByDisplayParams } from "../../store/bungie_player_routes";

function D2PlayerSearch() {
    const dispatch = useDispatch();

    let players;
    let playerDetailed;

    const [username, setUsername] = useState('');
    const [nameCode, setNameCode] = useState('');

    const [showSearch, setShowSearch] = useState(false);
    const [showAdvSearch, setShowAdvSearch] = useState(false);

    const searchClass = "search-div" + (showSearch ? "": " hidden");
    const advSearchClass = "adv-search-div" + (showAdvSearch ? "": " hidden");

    useEffect(() => {
        //this is here to ensure the search result elements do hide when needed
    }, [showSearch, showAdvSearch]);

    const handleSearch = async (e) => {
        e.preventDefault();

        //console.log('username', username);

        if (!username) return;

        players = await dispatch(getPlayersByName(username));

        setShowAdvSearch(false);
        setShowSearch(true);

        //console.log('players', players);

    }

    const handleDetailedSearch = async (e) => {
        e.preventDefault();

        if (!username || !nameCode) return;

        playerDetailed = await dispatch(getPlayerByDisplayParams(username, nameCode));
        
        setShowSearch(false);
        setShowAdvSearch(true);

        //console.log('player', playerDetailed);

    }

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
                    </div>

                </div>

                <div className="adv-search-container">

                    <div className={advSearchClass}>
                        Testing advanced search
                    </div>

                </div>

            </div>

        </main>
    )
}

export default D2PlayerSearch;