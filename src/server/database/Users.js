const { ObjectId } = require('mongodb');
const produce = require('immer').default;
const bcrypt = require('bcrypt');

const { getDatabase } = require('./index');

const COLLECTION = 'users';

const Users = {
  async validatePassword(username, password, secret) {
    const users = getDatabase().collection(COLLECTION);
    const user = await users.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user._id;
    }

    return null;
  },

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

  async createUser({ username, password }) {
    const users = getDatabase().collection(COLLECTION);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    const insertProcess = await users.insertOne({ username, password: passwordHash });

    if (insertProcess.result.n === 1 && insertProcess.result.ok === 1) {
      return users.findOne({ _id: insertProcess.insertedId });
    }
  },

  async addBudget({ userId, budgetId }) {
    const users = getDatabase().collection(COLLECTION);
    const databaseUserId = ObjectId(userId);

    const user = await users.findOne({ _id: databaseUserId });
    let updatedBudgetList = user.budgets || [];

    const indexOfPreexistingEntry = updatedBudgetList.findIndex((budget) => budget === budgetId);

    if (indexOfPreexistingEntry === -1) {
      updatedBudgetList = [...user.budgets, budgetId];
    }

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

  async removeBudget({ userId, budgetId }) {
    const users = getDatabase().collection(COLLECTION);
    const databaseUserId = ObjectId(userId);

    const user = await users.findOne({ _id: databaseUserId });

    const updatedBudgetList = produce(user.budgets, (budgets) => budgets.filter((budget) => budget !== budgetId));
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
