import React from 'react';

const History = () => {
  const transactions = [
    { id: 1, date: '2024-03-15', number: '9876543210', amount: 299, status: 'Success' },
    { id: 2, date: '2024-03-10', number: '9876543210', amount: 599, status: 'Success' },
    { id: 3, date: '2024-03-05', number: '9876543210', amount: 199, status: 'Failed' },
    { id: 4, date: '2024-02-28', number: '9876543210', amount: 399, status: 'Success' }
  ];

  return (
    <div className="history-page">
      <h2>Transaction History</h2>
      
      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Mobile Number</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.number}</td>
                <td>{transaction.amount}</td>
                <td>
                  <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="history-summary">
        <h3>Summary</h3>
        <div className="summary-cards">
          <div className="summary-card">
            <h4>Total Transactions</h4>
            <p>{transactions.length}</p>
          </div>
          <div className="summary-card">
            <h4>Total Amount</h4>
            <p>₹{transactions.reduce((sum, t) => sum + t.amount, 0)}</p>
          </div>
          <div className="summary-card">
            <h4>Successful</h4>
            <p>{transactions.filter(t => t.status === 'Success').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;