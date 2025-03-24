import { useLoaderData } from "react-router-dom"
import { createTransaction, deleteItem, getAllMatchingItems } from "../helpers"
import BudgetProfile from "../components/BudgetProfile"
import AddTransactionForm from "../components/AddTransactionForm"
import Table from "../components/Table"
import { toast } from "react-toastify"

export async function budgetLoader({params}) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id // same as from the route on App.jsx
    })[0]

    const transactions = await getAllMatchingItems({
        category: "transactions",
        key: "budgetId",
        value: params.id // same as from the route on App.jsx
    })

    if (!budget) {
        throw new Error("Budget does not exist.")
    }
    return {budget, transactions}
}

export async function budgetAction({request}) {
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data);

    if (_action === "deleteTransaction") {
        // delete transaction
        try {
            deleteItem({
                key: "transactions",
                id: values.transactionId
            })
            return toast.success("Transaction deleted!")
        } catch (e) {
            throw new Error("There was a problem deleting the transaction.")
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
}


const BudgetPage = () => {
    const {budget, transactions} = useLoaderData();
    return (
        <div className="grid-lg" style={{"--accent": budget.colour}}>
            <h1><span>{budget.name}</span> Overview</h1>
            <div className="flex-lg">
                <BudgetProfile budget={budget} />
                <AddTransactionForm budgets={[budget]} />
            </div>
            {
                transactions && transactions.length > 0 && (
                    <div className="grid-md">
                        <h2><span>{budget.name}</span>Transactions</h2>
                        <Table transactions={transactions} showBudget={false}/>
                    </div>
            )}
        </div>
    )
}

export default BudgetPage