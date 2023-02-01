import { SVG } from "@assets/svg";
import { Stack } from "@mui/material";
import { USER_ROLES } from "@utils/enum";
import React from "react";
import { useSelector } from "react-redux";

const LanguageCard = ({ title, spoken, written, handleDelete, handleEdit }) => {
  const { role } = useSelector((state) => state.auth);

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <div className="list-content">
        <h5>{title}</h5>
        <Stack direction="row" alignItems="center" spacing={0.4}>
          <h6>Spoken:</h6>
          <h6 style={{ fontWeight: 500 }}>{spoken}</h6>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.4}>
          <h6>Written:</h6>
          <h6 style={{ fontWeight: 500 }}>{written}</h6>
        </Stack>
      </div>
      {role === USER_ROLES.jobSeeker && (
        <Stack direction="row" spacing={1} className="list-button">
          <button onClick={() => handleEdit()}>
            <SVG.EditIcon />
            <span>Edit</span>
          </button>
          <button onClick={() => handleDelete()}>
            <SVG.DeleteICon />
            <span>Delete</span>
          </button>
        </Stack>
      )}
    </Stack>
  );
};

export default LanguageCard;
