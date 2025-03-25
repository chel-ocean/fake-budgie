import { Form, Link } from "react-router-dom";
import {calculateSpentByBudget, formatCurrency, formatPercentage} from "../helpers";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/20/solid";

const BudgetProfile = ({budget, showDelete = false}) => {
    const {id, name, amount, color} = budget;
    const spent = calculateSpentByBudget(id);
    const remaining = amount - spent;
    const percentage = spent / amount;
    return (
        <div className="budget" style={{"--accent": color}}>
            <div className="progress-text">
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
                            }}>
                            <button type="submit" className="btn btn--warning">
                                <span>Delete Budget</span>
                                <TrashIcon width={20} />
                            </button>
                        </Form>
                        
                    </div>
                ) : (
                    <div className="flex-sm">
                        <Link to={`/budget/${id}`} className="btn"> 
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