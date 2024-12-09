import React, { useState } from 'react';

const BudgetTracker = ({ budget, onUpdate }) => {
  const [expense, setExpense] = useState('');

  const handleAddExpense = () => {
    const updatedBudget = {
      ...budget,
      spent: budget.spent + parseFloat(expense),
    };
    onUpdate(updatedBudget);
    setExpense('');
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Budget Tracker</h2>
      <p>Total Budget: ₹{budget.total}</p>
      <p>Spent: ₹{budget.spent}</p>
      <p>Remaining: ₹{budget.total - budget.spent}</p>
      <div className="mt-4">
        <input
          type="number"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          placeholder="Add Expense"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddExpense}
          className="bg-blue-500 text-white p-2 mt-2 rounded w-full"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default BudgetTracker;
