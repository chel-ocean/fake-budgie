// rrd imports
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

// helper functions
import { fetchData } from "../helpers";

// components
import Register from "../components/Register";

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    return {userName}
}

// action
export async function dashboardAction({request}) {
    const data = await request.formData();
    const formData = Object.fromEntries(data)
    try {
        localStorage.setItem("userName", JSON.stringify(formData.userName));
        return toast.success(`Welcome, ${formData.userName}!`);
    } catch (e) {
        throw new Error("There was a problem with your registration. Please try again.");
    }
}

const Dashboard = () => {
    const {userName} = useLoaderData();
    return (
        <>
            {userName ? (<p>{userName}</p>) : <Register />}
        </>
    )
}

export default Dashboard;