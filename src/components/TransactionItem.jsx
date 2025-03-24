import { TrashIcon } from "@heroicons/react/20/solid";
import { formatCurrency, formatDate, getAllMatchingItems } from "../helpers"
import { Link, useFetcher } from "react-router-dom"

const TransactionItem = ({transaction, showBudget = true}) => {
    const fetcher = useFetcher();
    const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: transaction.budgetId
    })[0];
  
    return (
    <>
        <td>{transaction.name}</td>
        <td>{formatCurrency(transaction.amount)}</td>
        <td>{formatDate(transaction.createdAt)}</td>
        {showBudget && (
            <td>
                <Link 
                    to={`/budget/${budget.id}`}
                    style={{"--accent": budget.color}}
                >{budget.name}</Link> 
            </td>
        )}
        
        <td>
            <fetcher.Form
                method="post">
                    <input type="hidden" name="_action" value="deleteTransaction"></input>
                    <input type="hidden" name="transactionId" value={transaction.id}></input>
                    <button
                        type="submit"
                        className="btn btn--warning"
                        aria-label={`Delete ${transaction.name} expense`}>
                            <TrashIcon width={20} />
                    </button>
                </fetcher.Form>
        </td>
    </>
  )
}

export default TransactionItem