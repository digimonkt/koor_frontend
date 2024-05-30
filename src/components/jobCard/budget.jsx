import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { SolidButton } from "@components/button";
import { getColorByRemainingDays } from "@utils/generateColor";
import { showDay } from "@utils/constants/utility";

const Budget = ({ jobDetails, budgetAmount, budgetPayPeriod }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "none",
          "@media (max-width: 480px)": {
            display: "block",
            "& .btn_font_lower": {
              display: "inline-block !important",
            },
          },
        }}
        className="text-start text-end mb-0 mb-lg-4"
      >
        <SolidButton
          className={
            jobDetails?.expiredInDays > 0
              ? "btn_font_lower"
              : "btn_font_capitalize"
          }
          title={
            jobDetails?.expiredInDays > 0
              ? showDay(jobDetails?.expiredInDays)
              : "Closed"
          }
          color={getColorByRemainingDays(
            jobDetails?.expiredInDays > 0 ? jobDetails?.expiredInDays : 0
          )}
        />
      </Box>
      {Boolean(parseInt(budgetAmount)) && (
        <div className="pricebox py-0 me-lg-4">
          <span className="d-block">UP TO</span>
          <h4>
            <small>{"$"}</small>
            {budgetAmount}
          </h4>
          <span>{budgetPayPeriod}</span>
        </div>
      )}
    </Box>
  );
};

Budget.prototype = {
  budgetAmount: PropTypes.number,
  budgetPayPeriod: PropTypes.string,
};

export default Budget;
