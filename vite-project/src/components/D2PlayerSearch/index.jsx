import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPlayersByName, getPlayerByDisplayParams } from "../../store/bungie_player_routes";

function D2PlayerSearch() {
    const dispatch = useDispatch();

    const players = useSelector((state) => state.players);
    const playerDetailed = useSelector((state) => state.player);

    const [username, setUsername] = useState('');
    const [nameCode, setNameCode] = useState('');

    useEffect(() => {
        dispatch(getPlayersByName(username));
        dispatch(getPlayerByDisplayParams(username, nameCode));
    }, [username, nameCode, dispatch]);

    const handleSearch = async (e) => {
        e.preventdefault();

        if (!username) return;


    }

    return (
        <main>

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

                <div>



                </div>

            </div>

        </main>
    )
}

export default D2PlayerSearch;