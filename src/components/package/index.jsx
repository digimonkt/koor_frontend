import { FilledButton } from "@components/button";
import { Grid } from "@mui/material";

export const Package = ({ packageData, handleBuyPackage }) => {
    return (packageData || []).map((item, index) => {
        return (
          <Grid key={index} item xl={4} lg={4} xs={12}>
            <h5 className="credits_title">{item.title}</h5>
            <p className="credits_head_credit">{item.credit} Credits</p>
            {(item.benefit || []).map((benefitList, benefitListIndex) => {
              return (
                <>
                  {benefitList !== "" && (
                    <li key={benefitListIndex}>{benefitList}</li>
                  )}
                </>
              );
            })}
            <FilledButton
              title={`$${item.price} BUY`}
              type="button"
              onClick={() => handleBuyPackage(item)}
              disabled={false}
            />
          </Grid>
        );
    });
};
