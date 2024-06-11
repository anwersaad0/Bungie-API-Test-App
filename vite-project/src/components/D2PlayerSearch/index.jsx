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

    // useEffect(() => {

    // }, [username, nameCode]);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!username) return;

        players = await dispatch(getPlayersByName(username));

    }

    const handleDetailedSearch = async (e) => {
        e.preventDefault();

        if (!username || !nameCode) return;

        playerDetailed = await dispatch(getPlayerByDisplayParams(username, nameCode));

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

                    <button type="submit">Search</button>

                    <button type="submit">Search Advanced</button>

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