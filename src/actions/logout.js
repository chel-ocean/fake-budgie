import { redirect } from "react-router-dom";

// helpers:
import { deleteItem } from "../helpers";

// library
import { toast } from "react-toastify";

export async function logoutAction() {
    // delete user
    deleteItem({key: "userName"});
    deleteItem({key: "budgets"});
    deleteItem({key: "transactions"});

    toast.success("Account deleted!")

    // return redirect to homepage
    return redirect("/");
}

