const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { getDatabase } = require('../database');
const { ObjectId } = require('mongodb');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
  },
});

const schema = new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: 'mutations',
    fields: {
      user: {
        type: UserType,
        args: {
          username: { type: GraphQLString },
        },
        async resolve(rootValue, { username }) {
          const users = getDatabase().collection('users');
          const insertProcess = await users.insertOne({ username });

          if (insertProcess.result.n === 1 && insertProcess.result.ok === 1) {
            return users.findOne({ _id: insertProcess.insertedId });
          }
        }
      }
    }
  }),
  query: new GraphQLObjectType({
    name: 'queries',
    fields: {
      users: {
        type: GraphQLList(UserType),
        async resolve() {
          const users = await getDatabase().collection('users').find().toArray();
          return users;
        }
      },
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLString },
        },
        async resolve(parent, { id }) {
          const users = getDatabase().collection('users');
          return users.findOne({ _id: ObjectId(id) });
        },
      },
    },
  }),
});

module.exports = {
  schema,
  root,
};
