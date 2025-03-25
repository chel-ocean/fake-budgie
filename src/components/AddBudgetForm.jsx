import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import {Form, useFetcher} from 'react-router-dom';
import { useEffect, useRef } from 'react';

const AddBudgetForm = () => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting";

    // access form:
    const formRef = useRef()
    const focusRef = useRef() // move cursor to name, not amount

    useEffect(() => {
        if(!isSubmitting){
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])
    
    return (
        <div className="form-wrapper border border-gray-200 p-4">
            <h2>Create Budget Profile</h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Profile Name</label>
                    <input 
                        type="text" 
                        name="newBudgetName"
                        id="newBudgetName"
                        placeholder="Enter budget name"
                        required
                        ref={focusRef}
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input 
                        type="number"
                        step="0.01" 
                        name="newBudgetAmount"
                        id="newBudgetAmount"
                        placeholder="Enter budget amount"
                        inputMode="decimal"
                        min = "0.01"
                        required
                    />
                </div>
                <input type="hidden" name="_action" value="createBudget" />
                <button 
                    type="submit" 
                    className="btn btn--dark"
                    disabled={isSubmitting}

                >
                    { isSubmitting ? 
                        <span>Creating...</span> 
                    : (
                        <>
                            <span>Create Budget</span>
                            <CurrencyDollarIcon width={20} />
                        </>
                    )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddBudgetForm;