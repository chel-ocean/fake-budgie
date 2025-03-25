import { useFetcher } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

const Register = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    return (
        <div className="intro">
            <div>
                <h1>
                    Take Control of <span className="accent">Your Money</span>
                </h1>
                <p>
                    Personal budgeting is the secret to financial success. Sign up today!
                </p>
                <fetcher.Form method="post">
                    <label>Enter Name</label>
                    <input 
                        type="text" 
                        name="userName" 
                        placeholder="Enter name" 
                        aria-label="Your Name" 
                        autoComplete="given-name" 
                        required
                    />
                    <label>Enter Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter email" 
                        aria-label="Your Email" 
                        autoComplete="email" 
                        required
                    />
                    <label>Enter Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter password" 
                        aria-label="Your Password" 
                        autoComplete="chosen-password" 
                        required
                    />
                    <input 
                        type="hidden"
                        name="_action"
                        value="newUser"></input>
                    <button 
                        type="submit" 
                        className="btn btn--dark"
                        disabled={isSubmitting}
                    >
                    { isSubmitting ? 
                        <span>Creating User...</span> 
                    : (
                        <>
                            <span>Create New User</span>
                            <PlusCircleIcon width={20} />
                        </>
                    )}
                    </button>
                </fetcher.Form>
            </div>
        </div>
    )
}

export default Register;