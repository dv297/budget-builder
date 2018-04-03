const schema = `
  type Budget {
    _id: String
    displayName: String
  }
  
  input CreateBudgetInput {
    displayName: String
  }
`;

module.exports = schema;
