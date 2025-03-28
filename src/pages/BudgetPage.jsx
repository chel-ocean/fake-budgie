import { useLoaderData } from "react-router-dom"
import { createTransaction, deleteItem, getAllMatchingItems, fetchData, duplicateTransaction} from "../helpers"
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
        throw new Response("Budget does not exist")
    }
    return {budget, transactions}
}

export async function budgetAction({request}) {
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data);

    try { // got rid of if... try... and made it try..l and then a bunch of if due to error handling
        // delete transaction
        if (_action === "deleteTransaction") {
            deleteItem({
                key: "transactions",
                id: values.transactionId
            });
            toast.success("Transaction deleted!");
            return null;  // important: Return null instead of toast since it was breaking after edit and updated the transaction
        }

        if (_action === "createTransaction") {
            // create transaction
            createTransaction({
                budgetId: values.newTransactionBudget,
                name: values.newTransactionName,
                amount: values.newTransactionAmount,
            });
            toast.success("Transaction created!");
            return null;
        }

        if (_action === "duplicateTransaction") {
            // duplicate transaction
            const transactions = fetchData("transactions") || [];
            const original = transactions.find(t => t.id === values.transactionId);
            
            if (!original) {
                throw new Error("Original transaction not found");
            }
      
            const newTransaction = {
                ...original,
                id: crypto.randomUUID(),
                name: `${original.name} (Copy)`,
            };
      
            localStorage.setItem("transactions", 
                JSON.stringify([...transactions, newTransaction])
            );
            toast.success("Transaction duplicated!");
            return null;
          }

        if (_action === "editTransaction") {
            //edit transaction
            const transactions = fetchData("transactions") || [];
            const updatedTransactions = transactions.map(t => 
                t.id === values.transactionId
                    ? { 
                    ...t, 
                        name: values.newName,
                        amount: Number(values.newAmount),
                    }
                : t
            );
            localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
            toast.success("Transaction updated!");
            return null;
        }

    } catch (error) {
        toast.error(error.message);
        // return null instead of throwing the error directly
        return null;
  }
}

const BudgetPage = () => {
    const { budget, transactions } = useLoaderData();

    return (
        <div className="grid-lg" style={{"--accent": budget.color}}>
            <h1><span className="accent">{budget.name}</span> Overview</h1>
            <div className="flex-lg">
                <BudgetProfile budget={budget} showDelete={true} />
                <AddTransactionForm budgets={[budget]} />
            </div>

        {transactions?.length > 0 ? (
            <div className="grid-md">
                <h2>
                    <span className="accent">{budget.name}</span> Transactions
                </h2>
                <Table transactions={transactions} showBudget={false} />
            </div>
        ) : (
            <p>No transactions yet</p>
            )}
        </div>
    )
}

export default BudgetPage;