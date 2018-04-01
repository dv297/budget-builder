const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const UserType = require('./UserType');
const Users = require('../../database/Users');

const schema = new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: 'mutations',
    fields: {
      createUser: {
        type: UserType,
        args: {
          username: { type: GraphQLString },
        },
        async resolve(rootValue, { username }) {
          return Users.addUser({ username });
        },
      },
    },
  }),
  query: new GraphQLObjectType({
    name: 'queries',
    fields: {
      users: {
        type: GraphQLList(UserType),
        async resolve() {
          return Users.getAllUsers();
        },
      },
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLString },
        },
        async resolve(parent, { id }) {
          return Users.getUserById(id);
        },
      },
    },
  }),
});

module.exports = schema;
