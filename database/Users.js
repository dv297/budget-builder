const { ObjectId } = require('mongodb');

const { getDatabase } = require('../database');

const COLLECTION = 'users';

const Users = {
  async getAllUsers() {
    return getDatabase()
      .collection(COLLECTION)
      .find()
      .toArray();
  },

  async getUserById(id) {
    const users = getDatabase().collection(COLLECTION);
    return users.findOne({ _id: ObjectId(id) });
  },

  async createUser({ username }) {
    const users = getDatabase().collection(COLLECTION);
    const insertProcess = await users.insertOne({ username });

    if (insertProcess.result.n === 1 && insertProcess.result.ok === 1) {
      return users.findOne({ _id: insertProcess.insertedId });
    }
  },

  async addBudget({ userId, budgetId }) {
    const users = getDatabase().collection(COLLECTION);
    const databaseUserId = ObjectId(userId);

    const user = await users.findOne({ _id: databaseUserId });

    const updatedBudgetList = user.budgets ? [...user.budgets, budgetId] : [];
    const updateProcess = await users.findOneAndUpdate(
      { _id: databaseUserId },
      { $set: { budgets: updatedBudgetList } },
    );

    if (
      updateProcess.lastErrorObject.n === 1 &&
      updateProcess.lastErrorObject.updatedExisting &&
      updateProcess.ok === 1
    ) {
      return users.findOne({ _id: databaseUserId });
    }
  },
};

module.exports = Users;
