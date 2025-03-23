export const wait = () => new Promise(resolve => setTimeout(resolve, Math.random() * 3000));


// colours
const generateRandomColour = () => {
    const existingBudgetLength = fetchData("budgets")?. length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`;
}

// Local storage

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

// delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key);
}

// budget
export const createBudget = ({name, amount}) => {
    const newBudget = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        colour: generateRandomColour()
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newBudget]));
}

// transaction
export const createTransaction = ({budgetId, name, amount}) => {
    const newTransaction = {
        id: crypto.randomUUID(),
        name: name,
        amount: +amount,
        createdAt: Date.now(),
        budgetId: budgetId,
    }
    const existingTransactions = fetchData("transactions") ?? [];
    return localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newTransaction]));
}

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const transactions = fetchData("transactions") ?? [];
    const budgetSpent = transactions.reduce((accum, transaction) => {
        if (transaction.budgetId === budgetId) {
            return accum + transaction.amount;
        }
        else return accum;
    }, 0)
    return budgetSpent;
}

// formatting:

// format currency:
export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
    });
}

// format percentages:
export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

// format date:
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
}