const Users = require('../../database/Users');

const resolvers = {
  Query: {
    users: () => Users.getAllUsers(),
    user: (rootValue, { _id }) => Users.getUserById(_id)
  },
  Mutation: {
    createUser: (rootValue, { username }) => Users.addUser({ username }),
  },
};

module.exports = resolvers;
