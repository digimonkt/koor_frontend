import { styled } from "@mui/material/styles";
import { Tab, Tabs } from "@mui/material";

export const AntTabs = styled(Tabs)({
  borderBottom: "1px solid transparent",
  "& .MuiTabs-indicator": {
    backgroundColor: "#274593",
    borderRadius: "6px 6px 0px 0px",
    height: "4px",
  },
});

export const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(5),
    color: "#848484",
    paddingLeft: "0px",
    paddingRight: "0px",
    fontSize: "28px",

    fontFamily: ["Bahnschrift"].join(","),
    "&:hover": {
      color: "#121212",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#121212",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);
