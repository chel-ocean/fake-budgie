import React from 'react'
import TransactionItem from './TransactionItem'

const Table = ({transactions, showBudget = true}) => {
  return (
    <div>
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