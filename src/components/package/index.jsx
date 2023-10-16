import { SVG } from "@assets/svg";
import { FilledButton } from "../../components/button";
import { Grid } from "@mui/material";

export const Package = ({ packageData, handleBuyPackage }) => {
  return (packageData || []).map((item, index) => {
    return (
      <Grid key={index} item xl={4} lg={4} xs={12}>
        <div
          style={{
            border: "1px solid #D5E3F7",
            borderRadius: "20px",
            padding: "20px 40px 20px 40px",
          }}
        >
          <h5 className="credits_title">{item.title}</h5>
          <p className="credits_head_credit">{item.credit} Credits</p>
          <ul style={{ minHeight: "160px", padding: "0px" }}>
            {(item.benefit || []).map((benefitList, benefitListIndex) => {
              return (
                <>
                  {benefitList !== "" && (
                    <li key={benefitListIndex} className="credits_li">
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <SVG.CheckIcon className="me-2" /> {benefitList}
                      </span>
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
              padding: "5px 15px 5px 15px !important",
              width: "180.33px !important",
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
