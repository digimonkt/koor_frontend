import { SVG } from "@assets/svg";
import { FilledButton } from "../../components/button";
import { Grid } from "@mui/material";

export const Package = ({ packageData, handleBuyPackage }) => {
  return (packageData || []).map((item, index) => {
    return (
      <Grid key={index} item xl={4} lg={4} sm={4} xs={12}>
        <div className="credits_cards_div">
          <h5 className="credits_title">{item.title}</h5>
          <p className="credits_head_credit">{item.credit} Credits</p>
          <ul style={{ minHeight: "160px", padding: "0px" }}>
            {(item.benefit || []).map((benefitList, benefitListIndex) => {
              return (
                <>
                  {benefitList !== "" && (
                    <li key={benefitListIndex} className="credits_li">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <SVG.CheckIcon
                          className="me-2"
                          style={{ width: "19px", height: "19px" }}
                        />
                        <span style={{ flex: "1 1 0%" }}>{benefitList}</span>
                      </div>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
          <FilledButton
            title={`$${item.price} BUY`}
            className="credits_button"
            type="button"
            onClick={() => handleBuyPackage(item)}
            disabled={false}
            sx={{
              fontSize: "14px !important",
              fontWeight: "500 !important",
              color: "#000000 !important",
              border: "0px !important",
              letterSpacing: "0.28px !important",
              fontFamily: "Poppins !important",
              backgroundColor: "#d5e3f7 !important",
              padding: "5px 20px 5px 20px !important",
              height: "31px !important",
              "&:hover": {
                backgroundColor: "#d5e3f7 !important",
              },
            }}
          />
        </div>
      </Grid>
    );
  });
};
