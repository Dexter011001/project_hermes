const { model, Schema } = require("mongoose");

const expenseSchema = new Schema({
  amount: Number,
  body: String,
  type: String,
  createdAt: String,
});

module.exports = model("Expense", expenseSchema);
