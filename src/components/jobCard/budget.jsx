import React from "react";
import PropTypes from "prop-types";

const Budget = ({ budgetAmount, budgetPayPeriod }) => {
  console.log(budgetAmount);
  return (
    <>
      {Boolean(parseInt(budgetAmount)) && (
        <div className="pricebox py-3 me-lg-4">
          <span className="d-block">UP TO</span>
          <h4>
            <small>{"$"}</small>
            {budgetAmount}
          </h4>
          <span>{budgetPayPeriod}</span>
        </div>
      )}
    </>
  );
};

Budget.prototype = {
  budgetAmount: PropTypes.number,
  budgetPayPeriod: PropTypes.string,
};

export default Budget;
