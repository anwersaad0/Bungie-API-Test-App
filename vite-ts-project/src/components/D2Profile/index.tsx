import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { getD2Profile } from "../../store/bungie_routes";
// import { CLASS_LIST, RACE_LIST } from "./characterNumbers";
// import D2Item from "../D2Item";


function D2Profile() {
    const dispatch = useDispatch();
    //const {memId} = useParams();

    // const profile = useSelector((state) => state.bungieData["[object Object]"]);

    // useEffect(() => {
    //     dispatch(getD2Profile());
    // }, [dispatch]);

    // const characterList = (profile ? Object.values(profile?.Response?.characters?.data) : []);
    // const characterGear = (profile ? Object.values(profile?.Response?.characterEquipment?.data) : []);

    // const characterZip = (profile ? characterList.map((x, i) => [x, characterGear[i]]) : []);

    // console.log('profile', characterZip);

    // return (
    //     <main>

    //         <div className="container-profile-page">

    //             {profile ? (

    //                 <div>

    //                     <div className="profile-username-container">
    //                         Username: {profile?.Response?.profile?.data?.userInfo?.displayName}
    //                     </div>

    //                     <div className="profile-character-container">

    //                         <div>

    //                             {characterZip.map(([character, equippedGear]) => (
    //                                 <div>

    //                                     <img src={`https://www.bungie.net${character?.emblemBackgroundPath}`}></img>

    //                                     <div>
    //                                         {RACE_LIST[character?.raceType]} {CLASS_LIST[character?.classType]} {character?.light}
    //                                     </div>

    //                                     <div>
    //                                         <D2Item itemHash={equippedGear?.items[0]?.itemHash} />
                                            
    //                                     </div>

    //                                 </div>
    //                             ))}

    //                         </div>

    //                     </div>

    //                 </div>

    //             ) : (

    //                 <div>

    //                     <div> Fetching Data... </div>

    //                 </div>
    //             )}

    //         </div>

    //     </main>
    // )
}

export default D2Profile;