const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash.merge');

const User = require('./users/index');
const Budget = require('./budgets/index');
const Transaction = require('./transactions/index');

const schemaDefinition = `
    type Query {
      users: [User]
      user(_id: String): User
      budgets: [Budget]
      budget(_id: String): Budget
      transactions: [Transaction]
    }
    
    type Mutation {
      createUser(createUserInput: CreateUserInput): User
      createBudget(createBudgetInput: CreateBudgetInput): Budget
      addBudgetToUser(addBudgetToUserInput: AddBudgetToUserInput): User
      removeBudgetFromUser(removeBudgetFromUserInput: RemoveBudgetFromUserInput): User
    }
`;

const resolvers = merge(User.resolvers, Budget.resolvers, Transaction.resolvers);

const schema = makeExecutableSchema({
  typeDefs: [schemaDefinition, User.schema, Budget.schema, Transaction.schema],
  resolvers: resolvers,
});

module.exports = {
  schema,
};
