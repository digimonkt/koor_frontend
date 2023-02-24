import { Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SVG } from "@assets/svg";
import { USER_ROLES } from "@utils/enum";
import dayjs from "dayjs";
import { YEAR_FORMAT } from "@utils/constants/constants";
import { deleteEducationDetailsAPI } from "@api/jobSeeker";
import { setSuccessToast } from "@redux/slice/toast";
import { deleteEducationRecord } from "@redux/slice/user";

function EducationCard({
  id,
  title,
  startDate,
  endDate,
  present,
  institute,
  educationLevel,
  handleEdit,
}) {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const handleDelete = async () => {
    const res = await deleteEducationDetailsAPI(id);
    if (res.remote === "success") {
      dispatch(deleteEducationRecord(id));
      dispatch(setSuccessToast("Education Deleted Successfully"));
    } else {
      dispatch(setSuccessToast("Something went wrong"));
    }
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <div className="list-content">
        <h5>{title}</h5>
        <h6>{institute}</h6>
        <span>{educationLevel.title}</span> <br />
        <span>
          {dayjs(startDate).format(YEAR_FORMAT)} -{" "}
          {present ? "Present" : dayjs(endDate).format(YEAR_FORMAT)}
        </span>
      </div>
      {role === USER_ROLES.jobSeeker && (
        <Stack direction="row" spacing={1} className="list-button">
          <button onClick={handleEdit}>
            <SVG.EditIcon />
            <span>Edit</span>
          </button>
          <button onClick={handleDelete}>
            <SVG.DeleteICon />
            <span>Delete</span>
          </button>
        </Stack>
      )}
    </Stack>
  );
}

export default EducationCard;
