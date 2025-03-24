import { Form, Link } from "react-router-dom";
import {calculateSpentByBudget, formatCurrency, formatPercentage} from "../helpers";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/20/solid";

const BudgetProfile = ({budget, showDelete = false}) => {
    const {id, name, amount, colour} = budget;
    const spent = calculateSpentByBudget(id);
    const remaining = amount - spent;
    const percentage = spent / amount;
    return (
        <div
            className="border border-gray-200 p-4"
            style={{
                "--accent": colour
            }}>
            <div>
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={spent} className="w-100">
                {formatPercentage(percentage)} 
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(remaining)} remaining</small>
            </div>
            {
                showDelete ? (
                    <div className="flx-sm">
                        <Form
                            method="post"
                            action="delete"
                            onSubmit={(e) => {
                                if (!confirm("Are you sure you want to delete this Budget Profile?")) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <button type="submit" className="bth">
                                <span>Delete Budget</span>
                                <TrashIcon width={20} />
                            </button>
                        </Form>
                    </div>
                   
                ) : (
                    <div className="flex-sm">
                        <Link to={`/budget/${id}`} className="border border-gray-200 p-2 w-40 flex"> 
                            <span>View Details</span>
                            <BanknotesIcon width={20} />
                        </Link>
                    </div>
                    
                )
            }
        </div>

    )
}

export default BudgetProfile;