import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getJsonDefinitions } from "../../store/bungie_manifest_routes";

function HomePage() {
    const dispatch = useDispatch();

    // const definitions = useSelector((state) => state.manifest['[object Object]']);

    // useEffect(() => {
    //     dispatch(getJsonDefinitions());
    // }, [dispatch]);

    //console.log('defs', definitions);

    return (

        <main>

            <h1>Testing</h1>

        </main>

    )
}

export default HomePage;