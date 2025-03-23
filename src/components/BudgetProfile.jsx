import {calculateSpentByBudget, formatCurrency, formatPercentage} from "../helpers";

const BudgetProfile = ({budget}) => {
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
        </div>

    )
}

export default BudgetProfile;