import { Form } from "react-router-dom";

const Register = () => {
    return (
        <div>
            <div>
                <h1>
                    Take Control of <span className="text-blue-500">Your Money</span>
                </h1>
                <p>
                    Personal budgeting is the secret to financial success. Sign up today!
                </p>
                <Form method="post" className="flex flex-col w-50 border-black border-2 p-2">
                    <label>Enter Name</label>
                    <input 
                        type="text" 
                        name="userName" 
                        placeholder="Enter name" 
                        aria-label="Your Name" 
                        autoComplete="given-name" required
                        className="border-black border-2"
                    />
                    <label>Enter Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter email" 
                        aria-label="Your Email" 
                        autoComplete="email" 
                        className="border-black border-2"
                    />
                    <label>Enter Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter password" 
                        aria-label="Your Password" 
                        autoComplete="chosen-password" 
                        className="border-black border-2"
                    />
                    <input 
                        type="hidden"
                        name="_action"
                        value="newUser"></input>
                    <button type="submit" className="btn btn--dark bg-blue-700 mt-2">
                        <span>Sign Up</span>    
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default Register;