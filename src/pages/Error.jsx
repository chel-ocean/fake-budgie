import { useRouteError, Link, useNavigate } from "react-router-dom";

// library imports
import {ArrowUturnLeftIcon, HomeIcon} from '@heroicons/react/20/solid'

const Error = () => {
    const error =  useRouteError();
    const navigate = useNavigate();

    return (
        <div className="error">
            <h1>Uh oh! we have a problem</h1>
            <p>{error}</p>
            <div className="flex-md">
                <button className="btn btn--dark" onClick={() => navigate(-1)}>
                    <ArrowUturnLeftIcon width={20} />
                    <span>Go Back</span>
                </button>
                <Link to="/" className="btn btn--dark">
                <HomeIcon width={20} />
                    <span>Go Home</span>
                </Link>
            </div>
        </div>
    )
}

export default Error;