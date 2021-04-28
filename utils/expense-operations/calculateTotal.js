module.exports.calculateTotalExpense = (expense) => {
  let i;
  let total = 0;
  for (i = 0; i < expense.length; i++) {
    total += expense[i].amount;
  }

  return total;
};
