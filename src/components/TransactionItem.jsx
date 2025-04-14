import { useState, useEffect } from "react";
import { TrashIcon, PencilIcon, CheckIcon, XMarkIcon, DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import { formatCurrency, formatDate, getAllMatchingItems } from "../helpers";
import { Link, useFetcher } from "react-router-dom";

const TransactionItem = ({ transaction, showBudget = true }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(transaction.name);
    const [editedAmount, setEditedAmount] = useState(transaction.amount);
    const fetcher = useFetcher();
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: transaction.budgetId
    })[0];


    // CHANGE
    // save action is in progress
    const [isSaving, setIsSaving] = useState(false);
    const handleSave = () => {
        setIsSaving(true); // mark that a save action is starting
    };

    // this exit editing mode after saving
    useEffect(() => {
        if (isSaving && fetcher.state === "idle") {
            setIsEditing(false);
            setIsSaving(false);
        }
    }, [fetcher.state, isSaving]);

    return (
        <>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="edit-input edit-input--text"
                        required
                    />
                ) : (
                    transaction.name
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="number"
                        value={editedAmount}
                        onChange={(e) => setEditedAmount(e.target.value)}
                        className="edit-input edit-input--number"
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
                        // CHANGES: Wrapped Save, Delete, and Delete buttons together in a div so there's no uneven spacing
                        <div className="action-buttons-tight">
                            <fetcher.Form method="post" onSubmit={handleSave}>
                                <input type="hidden" name="_action" value="editTransaction" />
                                <input type="hidden" name="transactionId" value={transaction.id} />
                                <input type="hidden" name="newName" value={editedName} />
                                <input type="hidden" name="newAmount" value={editedAmount} />
                                <button
                                    type="submit"
                                    className="btn btn--accent"
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
                            >
                                <XMarkIcon width={20} />
                            </button>
                            <fetcher.Form method="post">
                                <input type="hidden" name="_action" value="deleteTransaction" />
                                <input type="hidden" name="transactionId" value={transaction.id} />
                                <button
                                    type="submit"
                                    className="btn btn--warning"
                                >
                                    <TrashIcon width={20} />
                                </button>
                            </fetcher.Form>
                        </div>
                    ) : (
                        // CHANGES: Wrapped Edit, Duplicate, and Delete buttons together in a div so there's no uneven spacing
                        <div className="action-buttons-tight">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn btn--dark"
                            >
                                <PencilIcon width={20} />
                            </button>
                            <fetcher.Form method="post">
                                <input type="hidden" name="_action" value="duplicateTransaction" />
                                <input type="hidden" name="transactionId" value={transaction.id} />
                                <button
                                    type="submit"
                                    className="btn btn--dark"
                                >
                                    <DocumentDuplicateIcon width={20} />
                                </button>
                            </fetcher.Form>
                            <fetcher.Form method="post">
                                <input type="hidden" name="_action" value="deleteTransaction" />
                                <input type="hidden" name="transactionId" value={transaction.id} />
                                <button
                                    type="submit"
                                    className="btn btn--warning"
                                >
                                    <TrashIcon width={20} />
                                </button>
                            </fetcher.Form>
                        </div>
                    )}
                </div>
            </td>
        </>
    );
};

export default TransactionItem;