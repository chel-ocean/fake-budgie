import { useState } from "react";
import { TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { formatCurrency, formatDate, getAllMatchingItems } from "../helpers";
import { Link, useFetcher } from "react-router-dom";

const TransactionItem = ({transaction, showBudget = true}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(transaction.name);
    const [editedAmount, setEditedAmount] = useState(transaction.amount);
    const fetcher = useFetcher();
    const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: transaction.budgetId
    })[0];

    return (
    <>
        <td>
            {isEditing ? ( //editing the title
            <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="edit-input"
                required
            />
            ) : (
            transaction.name
            )}
        </td>
        <td>
            {isEditing ? ( //editing the amount of money
            <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                className="edit-input"
                step="0.01"
                min="0.01"
                required
            />
            ) : (
            formatCurrency(transaction.amount)
            )}
        </td>
        <td>{formatDate(transaction.createdAt)}</td>
        {showBudget && (
            <td>
            <Link
                to={`/budget/${budget.id}`}
                style={{ "--accent": budget.color }}
            >
                {budget.name}
            </Link>
            </td>
        )}
        <td>
            <div className="flex-sm">
            {isEditing ? (
                <>
                <fetcher.Form 
                    method="post"
                    onSubmit={(e) => {
                    if (!editedName || !editedAmount) {
                        e.preventDefault();
                        return;
                    }
                    }}
                >
                    <input type="hidden" name="_action" value="editTransaction" />
                    <input type="hidden" name="transactionId" value={transaction.id} />
                    <input type="hidden" name="newName" value={editedName} />
                    <input type="hidden" name="newAmount" value={editedAmount} />
                    <button
                        type="submit"
                        className="btn btn--dark"
                        aria-label="Save changes"
                        disabled={fetcher.state === "submitting"}
                    >
                    <CheckIcon width={20} />
                    </button>
                </fetcher.Form>
                <button
                    className="btn btn--warning"
                    onClick={() => {
                        setIsEditing(false);
                        setEditedName(transaction.name);
                        setEditedAmount(transaction.amount);
                    }}
                    aria-label="Cancel editing"
                >
                    <XMarkIcon width={20} />
                </button>
                </>
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn--dark"
                    aria-label="Edit transaction"
                >
                <PencilIcon width={20} />
                </button>
            )}
            <fetcher.Form method="post">
                <input type="hidden" name="_action" value="deleteTransaction" />
                <input type="hidden" name="transactionId" value={transaction.id} />
                <button
                    type="submit"
                    className="btn btn--warning"
                    aria-label={`Delete ${transaction.name} expense`}
                >
                <TrashIcon width={20} />
                </button>
            </fetcher.Form>
            </div>
        </td>
        </>
    );
};

export default TransactionItem; 