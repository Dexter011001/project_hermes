const { AuthenticationError, UserInputError } = require("apollo-server");
const date = require("date-and-time");

const Expense = require("../../models/Expense");
const ExpenseAnalytics = require("../../models/ExpenseAnalytics");
const checkAuth = require("../../utils/check-auth");
const {
  calculateTotalExpense,
} = require("../../utils/expense-operations/calculateTotal");

module.exports = {
  Query: {
    async getExpenses() {
      try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        return expenses;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getExpense(_, { expenseId }) {
      try {
        const expense = await Expense.findById(expenseId);
        if (expense) {
          return expense;
        } else {
          throw new Error("Expense not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getExpensesType(_, { expenseType }) {
      try {
        const expenses = await Expense.find();
        return expenses.filter((a) => a.type == expenseType);
      } catch (err) {
        throw new Error(err);
      }
    },

    async getTotalExpense() {
      try {
        let currentDate = new Date().toISOString().slice(0, 10);
        let dateWeekAgo = new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
          .toISOString()
          .slice(0, 10);

        const totalExpenses = await Expense.find().sort({ createdAt: -1 });
        const totalDailyExpenses = await Expense.find({
          createdAt: currentDate,
        });

        const totalWeeklyExpenses = await Expense.find({
          createdAt: { $lte: currentDate, $gte: dateWeekAgo },
        });
        console.log(totalWeeklyExpenses);

        amountTotal = calculateTotalExpense(totalExpenses);
        amountTotalPerDay = calculateTotalExpense(totalDailyExpenses);
        amountTotalPerWeek = calculateTotalExpense(totalWeeklyExpenses);
        const newExpenseAnalytics = new ExpenseAnalytics({
          amountTotal,
          amountTotalPerDay,
          amountTotalPerWeek,
        });

        const totalExpense = await newExpenseAnalytics.save();
        return totalExpense;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async addExpense(_, { amount, type, body }, context) {
      const user = checkAuth(context);
      console.log(user);

      const newExpense = new Expense({
        amount,
        type,
        body,
        user: user.id,
        createdAt: new Date().toISOString().slice(0, 10),
      });

      const expense = await newExpense.save();

      return expense;
    },
  },
};
