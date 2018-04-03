const schema = `
  type User {
    _id: String
    username: String
    budgets: [Budget]
  }
  
  input AddBudgetToUserInput {
    budgetId: String
    userId: String
  }
`;

module.exports = schema;
