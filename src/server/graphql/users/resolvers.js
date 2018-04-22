const Users = require('../../database/Users');
const Budgets = require('../../database/Budgets');

const getBudgetsForUser = (user) => Promise.all(user.budgets.map(Budgets.getBudgetById));

const getUserFieldResolvers = (user) => ({
  ...user,
  budgets: async () => getBudgetsForUser(user),
});

const resolvers = {
  Query: {
    users: () => Users.getAllUsers(),
    user: async (rootValue, parameters) => {
      const user = await Users.getUserById(parameters._id);
      return getUserFieldResolvers(user);
    },
  },
  Mutation: {
    createUser: (rootValue, { createUserInput }) => Users.createUser(createUserInput),
    addBudgetToUser: async (rootValue, { addBudgetToUserInput: { userId, budgetId } }) => {
      const user = await Users.addBudget({
        userId,
        budgetId,
      });
      return getUserFieldResolvers(user);
    },
    removeBudgetFromUser: async (rootValue, { removeBudgetFromUserInput: { userId, budgetId } }) => {
      const user = await Users.removeBudget({
        userId,
        budgetId,
      });
      return getUserFieldResolvers(user);
    },
  },
};

module.exports = resolvers;
