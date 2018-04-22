const resolvers = {
  Query: {
    transactions: () => {
      return [
        {
          _id: 'mock id',
          displayName: 'transaction 1',
          value: -2.5,
        },
      ];
    },
  },
};

module.exports = resolvers;
