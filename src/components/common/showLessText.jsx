import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getColorByRole } from "@utils/generateColor";
import { useMediaQuery } from "@mui/material";

const ShowLessText = ({ item, components }) => {
  const { role } = useSelector(({ auth }) => auth);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [state, setState] = useState({
    show: false,
    truncatedDescription: "",
    roleColor: getColorByRole(role),
  });
  // eslint-disable-next-line no-extra-boolean-cast
  const isToggle =
    Boolean(components) && isMobile ? true : item.split(" ").length > 30;

  const truncateDescription = (description) => {
    if (description) {
      const words = description?.split(" ");
      const truncated = words.slice(0, isMobile ? 15 : 30).join(" ");
      setState((prev) => ({ ...prev, truncatedDescription: truncated }));
    }
  };

  const toggleDescription = () => {
    setState((prev) => ({
      ...prev,
      show: !prev.show,
    }));
  };
  useEffect(() => {
    truncateDescription(item);
  }, [item]);

  return (
    <div>
      <div
        className="details"
        dangerouslySetInnerHTML={{
          __html: state.show
            ? item
            : state.truncatedDescription + (isToggle ? "..." : ""),
        }}
      />
      {Boolean(components) && state.show && components}
      {item && isToggle && (
        <span onClick={toggleDescription}>
          <p
            style={{
              color: state.roleColor,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {state.show ? "Show Less" : "Show More"}
          </p>
        </span>
      )}
    </div>
  );
};

export default ShowLessText;
