import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

// loader
export function transactionsLoader() {
    const transactions = fetchData("transactions");
    return {transactions}
}

// action
export async function transactionsAction({request}) {
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data);

    if (_action === "deleteTransaction") {
        // delete transaction
        try {
            deleteItem({
                key: "transactions",
                id: values.transactionId
            })
            return toast.success("Expense deleted!")
        } catch (e) {
            throw new Error("There was a problem deleting the expense.")
        }
    }
}

const TransactionsPage = () => {
    const {transactions} = useLoaderData();
    return (
        <div className="grid-lg">
            <h1>All Transactions</h1>
            {
                transactions && transactions.length > 0 ? (
                    <div className="grid-md">
                        <h2>Recent Transactions <small>({transactions.length} total)</small></h2>
                        <Table transactions={transactions} />
                    </div>
                ) : (
                    <p>No expenses to show.</p>
                )
            }
        </div>
    )
}

export default TransactionsPage