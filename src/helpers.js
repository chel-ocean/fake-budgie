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