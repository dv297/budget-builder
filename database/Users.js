const { getDatabase } = require('../database');
const { ObjectId } = require('mongodb');

const Users = {
  async getAllUsers() {
    return getDatabase()
      .collection('users')
      .find()
      .toArray();
  },

  async getUserById(id) {
    const users = getDatabase().collection('users');
    return users.findOne({ _id: ObjectId(id) });
  },

  async addUser({ username }) {
    const users = getDatabase().collection('users');
    const insertProcess = await users.insertOne({ username });

    if (insertProcess.result.n === 1 && insertProcess.result.ok === 1) {
      return users.findOne({ _id: insertProcess.insertedId });
    }
  },
};

module.exports = Users;
