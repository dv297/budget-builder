const { getDatabase } = require('./index');
const { ObjectId } = require('mongodb');

const COLLECTION = 'budgets';

const Budgets = {
  async getAllBudgets() {
    return getDatabase()
      .collection(COLLECTION)
      .find()
      .toArray();
  },

  async getBudgetById(id) {
    const budgets = getDatabase().collection(COLLECTION);
    return budgets.findOne({ _id: ObjectId(id) });
  },

  async createBudget({ displayName }) {
    const budgets = getDatabase().collection(COLLECTION);
    const insertProcess = await budgets.insertOne({ displayName });

    if (insertProcess.result.n === 1 && insertProcess.result.ok === 1) {
      return budgets.findOne({ _id: insertProcess.insertedId });
    }
  },
};

module.exports = Budgets;
