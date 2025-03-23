import { formatCurrency, formatDate } from "../helpers"

const TransactionItem = ({transaction}) => {
  return (
    <>
        <td>{transaction.name}</td>
        <td>{formatCurrency(transaction.amount)}</td>
        <td>{formatDate(transaction.createdAt)}</td>
    </>
  )
}

export default TransactionItem