import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getD2Item } from "../../store/bungie_item_routes";
import { useParams } from "react-router-dom";


function D2Item() {
    const dispatch = useDispatch();
    const {itemHash} = useParams();

    useEffect(() => {
        dispatch(getD2Item(itemHash));
    }, [itemHash, dispatch]);

    const item = useSelector((state) => state.bungieItemData['[object Object]'])

    //console.log('item', item);

    return (
        <main>

            <div>

                <div>
                    <img 
                        src={`https://www.bungie.net${item?.Response?.displayProperties?.icon}`}
                        alt={`https://www.bungie.net${item?.Response?.displayProperties?.name}`}
                    ></img>
                </div>

            </div>

        </main>
    )
}

export default D2Item;