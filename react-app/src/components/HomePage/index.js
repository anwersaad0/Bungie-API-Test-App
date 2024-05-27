import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getD2Profile } from "../../store/bungie_routes";

function HomePage() {
    const dispatch = useDispatch();
    //const {memId} = useParams();

    useEffect(() => {
        dispatch(getD2Profile());
    }, [dispatch]);

    const profile = useSelector((state) => state.bungieData["[object Object]"]);


    console.log('profile', profile?.Response);

    return (
        <main>
            
            <div>Testing</div>

            <div>

                <div>

                    API test here

                    <div>
                        {JSON.stringify(profile?.Response)}
                    </div>

                </div>

            </div>

        </main>
    )
}

export default HomePage;