import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getD2Profile } from "../../store/bungie_routes";
import classList from "./classNumbers";

function D2Profile() {
    const dispatch = useDispatch();
    //const {memId} = useParams();

    const profile = useSelector((state) => state.bungieData["[object Object]"]);

    useEffect(async () => {
        dispatch(getD2Profile());
    }, [dispatch]);

    const characterList = (profile ? Object.values(profile?.Response?.characters?.data) : []);

    console.log('profile', profile);

    return (
        <main>

            <div className="container-profile-page">

                {profile ? (

                    <div>

                        <div className="profile-username-container">
                            Username: {profile?.Response?.profile?.data?.userInfo?.displayName}
                        </div>

                        <div className="profile-character-container">

                            <div>

                                {characterList.map(({ emblemBackgroundPath, classType, light, stats }) => (
                                    <div>

                                        <img src={`https://www.bungie.net${emblemBackgroundPath}`}></img>

                                        <div>{classList[classType]} {light}</div>

                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                ) : (

                    <div>

                        <div> Fetching Data... </div>

                    </div>
                )}

            </div>

        </main>
    )
}

export default D2Profile;