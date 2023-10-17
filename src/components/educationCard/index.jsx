import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SVG } from "../../assets/svg";
import { USER_ROLES } from "../../utils/enum";
import dayjs from "dayjs";
import { YEAR_FORMAT } from "../../utils/constants/constants";
import { deleteEducationDetailsAPI } from "../../api/jobSeeker";
import { setSuccessToast, setErrorToast } from "../../redux/slice/toast";
import { deleteEducationRecord } from "../../redux/slice/user";
import DialogBox from "../../components/dialogBox";
import DeleteCard from "../../components/deleteCard";

function EducationCard({
  id,
  title,
  startDate,
  endDate,
  present,
  institute,
  educationLevel,
  handleEdit,
  noOptions,
}) {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteEducationDetailsAPI(id);
    if (res.remote === "success") {
      dispatch(deleteEducationRecord(id));
      dispatch(setSuccessToast("Education Deleted Successfully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
    setLoading(false);
    setDeleting(false);
  };
  return (
    <>
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
        {role === USER_ROLES.jobSeeker && !noOptions ? (
          <Stack direction="row" spacing={1} className="list-button">
            <button onClick={handleEdit}>
              <SVG.EditIcon />
              <span>Edit</span>
            </button>
            <button onClick={() => setDeleting(true)}>
              <SVG.DeleteICon />
              <span>Delete</span>
            </button>
          </Stack>
        ) : null}
      </Stack>
      <DialogBox open={deleting} handleClose={() => setDeleting(false)}>
        <DeleteCard
          title="Delete Education"
          content="Are you sure you want to delete education?"
          handleCancel={() => setDeleting(false)}
          handleDelete={handleDelete}
          loading={loading}
        />
      </DialogBox>
    </>
  );
}

export default EducationCard;
