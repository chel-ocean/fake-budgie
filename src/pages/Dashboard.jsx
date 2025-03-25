// rrd imports
import { useLoaderData, Link } from "react-router-dom";
import { toast } from "react-toastify";

// helper functions
import { createBudget, fetchData, wait, createTransaction, deleteItem } from "../helpers";

// components
import Register from "../components/Register";
import AddBudgetForm from "../components/AddBudgetForm";
import AddTransactionForm from "../components/AddTransactionForm";
import BudgetProfile from "../components/BudgetProfile";
import Table from "../components/Table";

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets"); 
    const transactions = fetchData("transactions");
    return {userName, budgets, transactions}
}

// action
export async function dashboardAction({request}) {
    await wait();
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    
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
            return toast.success(`Transaction ${values.newTransactionName} created!`);
        } catch (e) {
            throw new Error("There was a problem with your transaction creation. Please try again.");
        }
    }

    if (_action === "deleteTransaction") {
        try {
            deleteItem({
                key: "transactions",
                id: values.transactionId // from form with hidden input
            })
            return toast.success("Transaction deleted!");
        } catch (e) {
            throw new Error("There was a problem with your transaction deletion. Please try again.");
        }
    }
}

const Dashboard = () => {
    const {userName, budgets, transactions} = useLoaderData();
    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        {budgets && budgets.length > 0 ? (
                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm />
                                        <AddTransactionForm budgets={budgets}/>
                                    </div>
                                    <h2>Existing Budgets</h2>
                                    <div className="budgets">
                                        {
                                            budgets.map((budget) => (<BudgetProfile key={budget.id} budget={budget} />))
                                        }
                                    </div>
                                    {transactions && transactions.length > 0 && (
                                        <div className="grid-md">
                                            <h2>Recent Transactions</h2>
                                            <Table transactions={transactions.sort((a, b) => b.createdAt - a.createdAt)
                                                .slice(0,5)
                                            }/>
                                            {transactions.length > 5 && (
                                                <Link to="transactions" className="btn btn--dark">View All Transactions</Link>
                                            )}
                                        </div>
                                        )}
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
            ) : <Register />}
        </>
    )
}

export default Dashboard;