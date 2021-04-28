const usersResolvers = require("./users");
const expenseResolvers = require("./expenses");

module.exports = {
  Query: {
    ...expenseResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...expenseResolvers.Mutation,
  },
};
