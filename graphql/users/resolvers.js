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
    user: async (rootValue, { _id }) => {
      const user = await Users.getUserById(_id);
      return getUserFieldResolvers(user);
    },
  },
  Mutation: {
    createUser: (rootValue, parameters) => Users.createUser(parameters),
    addBudgetToUser: async (rootValue, { addBudgetToUserInput: { userId, budgetId } }) => {
      const user = await Users.addBudget({
        userId,
        budgetId,
      });
      return getUserFieldResolvers(user);
    },
  },
};

module.exports = resolvers;
