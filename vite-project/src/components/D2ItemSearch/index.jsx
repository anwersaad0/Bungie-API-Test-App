import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchD2Items } from "../../store/bungie_item_routes";

function D2ItemSearch() {
    const dispatch = useDispatch();

    const [itemList, setItemList] = useState([]);

    const [searchParam, setsearchParam] = useState('');

    const [showList, setShowList] = useState(false);

    const searchClass = "search-div" + (showList ? "" : " hidden");

    useEffect(() => {
        //ensures the search results elements are hidden when necessary
    }, [showList, dispatch]);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchParam) return;

        const items = await dispatch(searchD2Items(searchParam));
        console.log('items', items);

        //setItemList();

        setShowList(true);

    }

    return (
        <main>

            <div className="search-item-container">

                <div>



                </div>

                <div>



                </div>

            </div>

        </main>
    )
}

export default D2ItemSearch;