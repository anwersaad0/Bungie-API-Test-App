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
    //const [searchErrs, setSearchErrs] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        //console.log('username', username);

        if (!username) return;

        players = await dispatch(getPlayersByName(username));

        //console.log('players', players);

    }

    const handleDetailedSearch = async (e) => {
        e.preventDefault();

        if (!username || !nameCode) return;

        playerDetailed = await dispatch(getPlayerByDisplayParams(username, nameCode));
        
        //console.log('player', playerDetailed);

    }

    return (
        <main>

            <div>

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

            <div>

                <div>



                </div>

            </div>

        </main>
    )
}

export default D2PlayerSearch;