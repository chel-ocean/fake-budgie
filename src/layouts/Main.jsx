// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// helper functions
import { fetchData } from "../helpers";

import Nav from "../components/Nav";

// loader
export function mainLoader() {
    const userName = fetchData("userName");
    return {userName}
}

const Main = () => {
    const {userName} = useLoaderData();
    return (
        <div>
            <Nav userName={userName}/>
            <h1>Main</h1>
            <main>
                <Outlet />
            </main>
            Main
        </div>
    )
}

export default Main;