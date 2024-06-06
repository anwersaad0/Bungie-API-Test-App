import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getD2CharacterItems } from "../../store/bungie_item_routes";

function D2CharInv(...hashes) {
    const dispatch = useDispatch();

    const charItems = useSelector((state) => state.bungieItemData);

    useEffect(() => {
        dispatch(getD2CharacterItems(...hashes));
    }, [dispatch]);

    return (
        <main>

        </main>
    )
}

export default D2CharInv;