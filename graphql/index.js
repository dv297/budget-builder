const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash.merge');

const User = require('./users');
const Transaction = require('./transactions');

const schemaDefinition = `
    type Query {
      users: [User]
      user(_id: String): User
      transactions: [Transaction]
    }
    
    type Mutation {
      createUser(username: String): User
    }
`;

const resolvers = merge(User.resolvers, Transaction.resolvers);

const schema = makeExecutableSchema({
  typeDefs: [schemaDefinition, Transaction.schema, User.schema],
  resolvers: resolvers,
});

module.exports = {
  schema,
};
