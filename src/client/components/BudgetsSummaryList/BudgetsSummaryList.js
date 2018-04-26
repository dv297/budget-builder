import React from 'react';
import { Header } from 'semantic-ui-react';

const BudgetsSummaryList = ({ budgets }) => {
  return (
    <div>
      {budgets.map((budget) => (
        <Header as="h2" key={budget._id}>
          {budget.displayName}
        </Header>
      ))}
    </div>
  );
};

export default BudgetsSummaryList;
