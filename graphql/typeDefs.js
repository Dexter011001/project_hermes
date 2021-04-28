const { gql } = require("apollo-server");

module.exports = gql`
  type Expense {
    id: ID!
    body: String!
    createdAt: String!
    amount: Float!
    type: String!
  }

  type ExpenseAnalytics {
    amountTotal: Float!
    amountTotalPerWeek: Float!
    amountTotalPerDay: Float!
  }

  type User {
    id: ID!
    username: String!
    token: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getExpenses: [Expense]
    getExpense(expenseId: ID!): Expense
    getExpensesType(expenseType: String!): [Expense]
    getTotalExpense: ExpenseAnalytics!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    addExpense(amount: Float!, body: String!, type: String!): Expense!
  }
`;
