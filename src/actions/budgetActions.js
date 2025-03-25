import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems, fetchData } from "../helpers";
import { redirect } from "react-router-dom";

export function deleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets", 
            id: params.id
        })
        const associatedTransactions = getAllMatchingItems({
            category: "transactions",
            key: "budgetId",
            value: params.id
        })

        associatedTransactions.forEach((transaction) => {
            deleteItem({
                key: "transactions",
                id: transaction.id
            })
        });
        toast.success("Budget Profile deleted!")
    } catch (e){
        throw new Error("There was a problem deleting the Budget Profile.")
    }
    return redirect("/");
}

export async function editBudgetAmount({request, params}) {
    const data = await request.formData();
    const { newAmount } = Object.fromEntries(data);
    
    try {
        // update the budget amount
        const budgets = fetchData("budgets") || [];
        const updatedBudgets = budgets.map(budget => 
            budget.id === params.id
                ? { ...budget, amount: Number(newAmount) }
                : budget
        );
        
        localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
        toast.success("Budget amount updated!");
    } catch (e) {
        throw new Error("There was a problem updating the budget amount.");
    }
    
    return redirect(`/budget/${params.id}`);
}