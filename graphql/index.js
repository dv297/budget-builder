const { buildSchema } = require('graphql');
const { getDatabase } = require('../database');

const schema = buildSchema(`
  type Query {
    user(id: Int!): User
  }
  type User {
    username: String,
  }
`);

const root = {
  user: async () => {
    const users = getDatabase().collection('users');
    return users.findOne({});
  },
};

module.exports = {
  schema,
  root,
};
