const schema = `
  type User {
    _id: String,
    username: String,
  }
  
  type Query {
    users: [User]
    user(_id: String): User
  }
  
  type Mutation {
    createUser(username: String): User
  }
`;

module.exports = schema;
