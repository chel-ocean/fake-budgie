import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import {Form} from 'react-router-dom';

const AddBudgetForm = () => {
    return (
        <div className="form-wrapper border border-gray-200 p-4">
            <h2>Create Budget</h2>
            <Form method="post" className="grid-sm">
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input 
                        type="text" 
                        name="newBudgetName"
                        id="newBudgetName"
                        placeholder="Enter budget name"
                        required
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
                        required
                    />
                </div>
                <input type="hidden" name="_action" value="createBudget" />
                <button type="submit" className="btn btn--dark">
                    <span>Create Budget</span>
                    <CurrencyDollarIcon width={20} />
                </button>
            </Form>
        </div>
    )
}

export default AddBudgetForm;