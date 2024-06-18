import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getD2Item } from "../../store/bungie_item_routes";
import { useParams } from "react-router-dom";

import './D2Item.css';


function D2Item() {
    const dispatch = useDispatch();
    const { itemHash } = useParams();

    useEffect(() => {
        dispatch(getD2Item(itemHash));
    }, [itemHash, dispatch]);

    const item = useSelector((state) => state.bungieItemData['[object Object]'])

    console.log('item', item);

    return (
        <main>

            <div>

                <div className="inspect-item-header">

                    <div>

                        <img
                            src={`https://www.bungie.net${item?.Response?.displayProperties?.icon}`}
                            alt={`https://www.bungie.net${item?.Response?.displayProperties?.name}`}
                        ></img>

                    </div>

                    <div>

                        <h1>
                            {item?.Response?.displayProperties?.name}
                        </h1>

                        <h2>
                            {item?.Response?.itemTypeAndTierDisplayName}
                        </h2>

                    </div>

                </div>

                <div>
                    
                </div>



            </div>

        </main>
    )
}

export default D2Item;