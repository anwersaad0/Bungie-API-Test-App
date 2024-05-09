import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getD2Profile } from "../../store/bungie_routes";

function HomePage() {
    const dispatch = useDispatch();
    const {memType, memId} = useParams();

    const profile = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getD2Profile(memType, memId));
    }, [memType, memId, dispatch]);


    return (
        <main>
            
            <div>Testing</div>

            <div>

                <div>

                    API test here

                    

                </div>

            </div>

        </main>
    )
}

export default HomePage;