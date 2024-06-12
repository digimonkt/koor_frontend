import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const Budget = ({ jobDetails, budgetAmount, budgetPayPeriod }) => {
  // const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {Boolean(parseInt(budgetAmount)) && (
        <Box
          sx={{ "& h4": { width: "100%" } }}
          className="pricebox py-2"
          // style={
          //   isMobile
          //     ? {
          //         display: "flex",
          //         justifyContent: "flex-end",
          //         flexDirection: "column",
          //         alignItems: "flex-end",
          //       }
          //     : {}
          // }
        >
          <span className="d-block">UP TO</span>
          <h4
          // style={
          //   isMobile
          //     ? {
          //         display: "flex",
          //         justifyContent: "flex-end",
          //         flexDirection: "column",
          //         alignItems: "flex-end",
          //       }
          //     : {}
          // }
          >
            <div>
              <small>{"$"}</small>
              {budgetAmount}
            </div>
          </h4>
          <span>{budgetPayPeriod}</span>
        </Box>
      )}
    </Box>
  );
};

Budget.prototype = {
  budgetAmount: PropTypes.number,
  budgetPayPeriod: PropTypes.string,
};

export default Budget;
