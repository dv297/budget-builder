const { makeExecutableSchema } = require('graphql-tools');

const { resolvers, schema: UserSchema } = require('./users');

const schema = makeExecutableSchema({
  typeDefs: [UserSchema],
  resolvers,
});

module.exports = {
  schema,
};
