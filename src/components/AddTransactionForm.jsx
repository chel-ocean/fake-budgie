import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useRef, useEffect } from "react";
import { useFetcher } from "react-router-dom";

const AddTransactionForm = ({budgets}) => {
    const fetcher = useFetcher();
    const formRef = useRef();
    const focusRef = useRef();
    const isSubmitting = fetcher.state === "submitting";
    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    })
    return (
        <div className="form-wrapper ">
            <h2>Add New{" "}
                <span className="accent">
                    {budgets.length === 1 && `${budgets.map((budget) => budget.name)}`}
                </span>{" "} 
                    Expense
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm "
                ref={formRef}
            >
                <div className="transaction-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newTransactionName">Transaction Name</label>
                        <input 
                            type="text"
                            name="newTransactionName"
                            id="newTransactionName"
                            placeholder="Enter transaction name"
                            ref={focusRef}
                            required />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newTransactionAmount">Amount</label>
                        <input 
                            type="number"
                            step="0.01"
                            inputMode="decimal"
                            name="newTransactionAmount"
                            id="newTransactionAmount"
                            placeholder="Enter transaction amount"
                            required />
                    </div>
                </div>
                <div className="grid-sm" hidden={budgets.length === 1}>
                    <label htmlFor="newTransactionBudget">Select Budget Profile</label>
                    <select name="newTransactionBudget" id="newTransactionBudget" required>
                        {budgets.sort((a, b) => a.createdAt - b.createdAt).map((budget) => {
                            return (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            )
                        })}
                    </select>
                </div>
                <input type="hidden" name="_action" value="createTransaction"/>
                <button 
                    type="submit" 
                    className="btn btn--dark"
                    disabled={isSubmitting}
                >
                    { isSubmitting ? 
                        <span>Creating...</span> 
                    : (
                        <>
                            <span>Add Transaction</span>
                            <PlusCircleIcon width={20} />
                        </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddTransactionForm;