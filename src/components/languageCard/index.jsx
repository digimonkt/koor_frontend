import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SVG } from "@assets/svg";
import { USER_ROLES } from "@utils/enum";
import EditLanguages from "@pages/jobSeeker/myProfile/languages/editLanguages";
import DialogBox from "@components/dialogBox";

function LanguageCard({ deleteLanguage, index, taskObj, updateLanguageList }) {
  const { role } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const updateLanguage = (obj) => {
    updateLanguageList(obj, index);
    setOpen(false);
  };

  const handleToggleModel = () => {
    setOpen(!open);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <div className="list-content">
        <h5>{taskObj.language}</h5>
        <h6>{taskObj.spoken}</h6>
        <h6>{taskObj.written}</h6>
      </div>
      {role === USER_ROLES.jobSeeker && (
        <Stack direction="row" spacing={1} className="list-button">
          <button onClick={() => setOpen(true)}>
            <SVG.EditIcon />
            <span>Edit</span>
          </button>
          <button
            onClick={() => {
              deleteLanguage(index);
            }}
          >
            <SVG.DeleteICon />
            <span>Delete</span>
          </button>
        </Stack>
      )}
      <DialogBox open={open} handleToggleModel={handleToggleModel}>
        <EditLanguages updateLanguage={updateLanguage} taskObj={taskObj} />
      </DialogBox>
    </Stack>
  );
}

export default LanguageCard;
