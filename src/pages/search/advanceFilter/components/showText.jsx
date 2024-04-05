import { SVG } from "@assets/svg";
import { Box } from "@mui/material";
import { generateColor } from "@utils/constants/constants";
import { useSelector } from "react-redux";

const ShowText = ({ matches, defaultOpen, setData, data }) => {
  const { isMobileView } = useSelector(({ platform }) => platform);
  const { role, isLoggedIn } = useSelector(({ auth }) => auth);
  const color = generateColor(role);
  return (
    <span
      style={{
        whiteSpace: "nowrap",
        marginBottom: "10px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: isMobileView ? "center" : "space-between",
      }}
    >
      {isLoggedIn && (
        <Box sx={{ textAlign: "start", width: "100%" }}>Saved searches:</Box>
      )}
      {!isMobileView && matches && !defaultOpen && (
        <div
          onClick={() => setData(!data)}
          style={{
            color,
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Advanced filter{" "}
          {data ? (
            <span
              style={{
                marginLeft: "10px",
                width: "18px",
                display: "inline-block",
                color,
              }}
            >
              {<SVG.ArrowUpIcon />}
            </span>
          ) : (
            <span
              style={{
                marginLeft: "10px",
                width: "18px",
                display: "inline-block",
                color,
              }}
            >
              {<SVG.AdvancedDown />}
            </span>
          )}
        </div>
      )}
    </span>
  );
};

export default ShowText;
