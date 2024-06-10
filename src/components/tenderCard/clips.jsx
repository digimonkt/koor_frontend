import { Stack } from "@mui/material";
import React from "react";
import { ChipBox } from "../../components/jobCard/style";
import { capitalizeFirst } from "@utils/constants/utility";
import { SVG } from "../../assets/svg";

const Clips = ({ tenderDetails }) => {
  return (
    <Stack
      direction={{ xs: "row", sm: "row" }}
      spacing={{ xs: 1, sm: 1, md: 1 }}
      sx={{
        width: "100%",
        flexWrap: "wrap",
        "@media (max-width: 667px)": {
          overflow: "hidden",
          overflowX: "auto",
        },
      }}
      useFlexGap
      className="tender_card_chip"
    >
      {tenderDetails.sector && (
        <ChipBox
          label={`Sector: ${capitalizeFirst(
            tenderDetails?.sector?.title || ""
          )}`}
          icon={<>{<SVG.SellIcon />}</>}
        />
      )}
      {(tenderDetails?.tenderCategory || []).map((category, k) => {
        return (
          <ChipBox
            key={k}
            label={category.title}
            icon={<>{<SVG.SellIcon />}</>}
          />
        );
      })}
    </Stack>
  );
};

export default Clips;
