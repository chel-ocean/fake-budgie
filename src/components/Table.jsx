import React from 'react'
import TransactionItem from './TransactionItem'

const Table = ({transactions, showBudget = true}) => {
    const [sortBy, setSortBy] = React.useState("createdAtMostRecent");

    if (sortBy === "nameAsc") {
        transactions.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sortBy === "nameDesc") {
        transactions.sort((a, b) => (-a.name.localeCompare(b.name)));
    }
    else if (sortBy === "amountDesc") {
        transactions.sort((a, b) => a.amount - b.amount);
    }
    else if (sortBy === "amountAsc") {
        transactions.sort((a, b) => b.amount - a.amount);
    }
    else if (sortBy === "createdAtMostRecent") {
        transactions.sort((a, b) => b.createdAt - a.createdAt);
    }
    else {
        transactions.sort((a, b) => a.createdAt - b.createdAt);
    }

    const handleSelect = (sortBy) => {
        if (sortBy === "nameAsc") {
            setSortBy("nameAsc");
        }
        else if (sortBy === "nameDesc") {
            setSortBy("nameDesc");
        }
        else if (sortBy === "amountAsc") {
            setSortBy("amountAsc");
        }
        else if (sortBy === "amountDesc") {
            setSortBy("amountDesc");
        }
        else if (sortBy === "createdAtMostRecent") {
            setSortBy("createdAtMostRecent");
        }
        else {
            setSortBy("createdAtOldest");
        }
        return;
    }

  return (
    <div>
        <div className="flex justify-center items-center w-80 ">
            <label htmlFor="sort" className="w-30">Sort by: </label>
            <select id="sort" onChange={(e) => handleSelect(e.target.value)} className="">
                <option value="createdAtMostRecent">Most Recent</option>
                <option value="createdAtOldest">Oldest</option>
                <option value="nameAsc">Ascending</option>
                <option value="nameDesc">Descending</option>
                <option value="amountAsc">Highest Amount</option>
                <option value="amountDesc">Lowest Amount</option>
            </select>
        </div>
        <table className="table-auto w-full text-left">
            <thead>
                <tr>
                    {["Name", "Amount", "Date", showBudget? "Budget Profile" : "", ""].map((i, index) => (<th key={index}>{i}</th>))}
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <TransactionItem transaction={transaction} showBudget={showBudget}/>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table