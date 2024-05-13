import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getColorByRole } from "@utils/generateColor";

const ShowLessText = ({ item }) => {
  const { role } = useSelector(({ auth }) => auth);
  const [state, setState] = useState({
    show: false,
    truncatedDescription: "",
    roleColor: getColorByRole(role),
  });

  const truncateDescription = (description) => {
    if (description) {
      const words = description?.split(" ");
      const truncated = words.slice(0, 30).join(" ");
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
          __html: state.show ? item : state.truncatedDescription,
        }}
      />
      {item && item.split(" ").length > 30 && (
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
