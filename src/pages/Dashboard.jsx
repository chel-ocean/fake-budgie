// rrd imports
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

// helper functions
import { createBudget, fetchData, wait, createTransaction } from "../helpers";

// components
import Register from "../components/Register";
import AddBudgetForm from "../components/AddBudgetForm";
import AddTransactionForm from "../components/AddTransactionForm";

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets"); 
    return {userName, budgets}
}

// action
export async function dashboardAction({request}) {
    await wait();
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    console.log(_action);
    
    // new user submission
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}!`);
        } catch (e) {
            throw new Error("There was a problem with your registration. Please try again.");
        }
    }

    // new budget submission
    if (_action === "createBudget") {
        try {
            // create budget
            createBudget({
                name: values.newBudgetName,
                amount: values.newBudgetAmount
            })
            return toast.success("Budget created successfully");
        } catch (e) {
            throw new Error("There was a problem with your budget creation. Please try again.");
        }
    }

    if (_action === "createTransaction") {
        try {
            // create transaction
            createTransaction({
                budgetId: values.newTransactionBudget,
                name: values.newTransactionName,
                amount: values.newTransactionAmount,
                
            })
            return toast.success(`Trasaction ${values.newTransactionName} created!`);
        } catch (e) {
            throw new Error("There was a problem with your transaction creation. Please try again.");
        }
    }
}

const Dashboard = () => {
    const {userName, budgets} = useLoaderData();
    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="">{userName}</span></h1>
                    <div className="grid-sm">
                        {
                            budgets && budgets.length > 0 ? (
                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm />
                                        <AddTransactionForm budgets={budgets}/>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid-sm">
                                    <p>Create a budget to get started!</p>
                                    <AddBudgetForm />
                                </div>
                            )
                            
                        }
                    </div>
                </div>
            ) 
            : <Register />}
        </>
    )
}

export default Dashboard;