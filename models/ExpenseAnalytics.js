const { model, Schema } = require("mongoose");

const expenseAnalyticsSchema = new Schema({
  amountTotal: Number,
  amountTotalPerWeek: Number,
  amountTotalPerDay: Number,
});

module.exports = model("ExpenseAnalytics", expenseAnalyticsSchema);
