import { formatCurrency, formatDate } from "../utils";

function TransactionsTable({ data }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Region</th>
            <th>Product</th>
            <th>Category</th>
            <th>Payment</th>
            <th>Quantity</th>
            <th>Final amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              <td>{row.customerName}</td>
              <td>{row.phoneNumber}</td>
              <td>{row.customerRegion}</td>
              <td>{row.productName}</td>
              <td>{row.productCategory}</td>
              <td>{row.paymentMethod}</td>
              <td>{row.quantity}</td>
              <td>{formatCurrency(row.finalAmount)}</td>
              <td>{formatDate(row.date)}</td>
              <td>
                <span className={`status-pill status-${(row.orderStatus || "unknown").toLowerCase()}`}>
                  {row.orderStatus || "Unknown"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
