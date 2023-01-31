import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SVG } from "@assets/svg";
import { USER_ROLES } from "@utils/enum";
import DialogBox from "@components/dialogBox";
import EditWorkExperience from "@pages/jobSeeker/myProfile/work-experience/editWorkExperience";

function WorkExperienceCard({
  deleteExperience,
  index,
  taskObj,
  updateExperienceList,
}) {
  const { role } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const updateExperience = (obj) => {
    updateExperienceList(obj, index);
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
        <h5>{taskObj.role}</h5>
        <h6>{taskObj.description}</h6>
        <h6>{taskObj.date}</h6>
      </div>
      {role === USER_ROLES.jobSeeker && (
        <Stack direction="row" spacing={1} className="list-button">
          <button onClick={() => setOpen(true)}>
            <SVG.EditIcon />
            <span>Edit</span>
          </button>
          <button
            onClick={() => {
              deleteExperience(index);
            }}
          >
            <SVG.DeleteICon />
            <span>Delete</span>
          </button>
        </Stack>
      )}
      <DialogBox open={open} handleToggleModel={handleToggleModel}>
        <EditWorkExperience
          updateExperience={updateExperience}
          taskObj={taskObj}
        />
      </DialogBox>
    </Stack>
  );
}

export default WorkExperienceCard;
