import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
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