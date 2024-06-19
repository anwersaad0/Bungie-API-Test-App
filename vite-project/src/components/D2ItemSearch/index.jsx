import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchD2Items } from "../../store/bungie_item_routes";

import './D2ItemSearch.css';

function D2ItemSearch() {
    const dispatch = useDispatch();

    const [itemList, setItemList] = useState([]);

    const [searchParam, setSearchParam] = useState('');

    const [showList, setShowList] = useState(false);

    const searchClass = "search-div" + (showList ? "" : " hidden");

    useEffect(() => {
        //ensures the search results elements are hidden when necessary
    }, [showList, dispatch]);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchParam) return;

        const items = await dispatch(searchD2Items(searchParam));

        setItemList(items?.Response?.results?.results);

        setShowList(true);

    }

    //console.log('items', itemList);

    return (
        <main>

            <div className="search-item-container-root">

                <div>
                    <h1>Search Item</h1>
                </div>

                <div className="search-item-ui">

                    <div>

                        <input
                            placeholder="Enter an item name"
                            onChange={e => setSearchParam(e.target.value)}
                            className="item-search"
                        ></input>

                        <button type="submit" onClick={e => handleSearch(e)} >Search</button>

                    </div>

                </div>

                <div className="item-search-container">

                    <div className={searchClass}>

                        <div className="item-search-result-container">

                            {itemList.map(({hash, displayProperties}) => (

                                <div className="item-container">

                                    <NavLink to={`/item/${hash}`}>
                                    
                                        <img className="search-item-icon" src={`https://www.bungie.net${displayProperties?.icon}`} ></img>
                                    
                                    </NavLink>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </main>
    )
}

export default D2ItemSearch;