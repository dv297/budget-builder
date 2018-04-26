const schema = `
  type User {
    _id: String
    username: String
    budgets: [Budget]
  }
  
  input CreateUserInput {
    username: String
    password: String
  }
  
  input AddBudgetToUserInput {
    budgetId: String
    userId: String
  }
  
  input RemoveBudgetFromUserInput {
    budgetId: String
    userId: String
  }
`;

module.exports = schema;
