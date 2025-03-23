import React from 'react'
import TransactionItem from './TransactionItem'

const Table = ({transactions}) => {
  return (
    <div>
        <table className="table-auto w-full text-left">
            <thead>
                <tr>
                    {["Name", "Amount", "Date"].map((i, index) => (<th key={index}>{i}</th>))}
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <TransactionItem transaction={transaction}/>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table