const Budgets = require('../../database/Budgets');

const resolvers = {
  Query: {
    budgets: () => Budgets.getAllBudgets(),
    budget: (rootValue, { _id }) => Budgets.getBudgetById({ _id }),
  },
  Mutation: {
    createBudget: (rootValue, { createBudgetInput: { displayName } }) => Budgets.createBudget({ displayName }),
  },
};

module.exports = resolvers;
