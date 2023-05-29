import { deleteWorkExperienceDetailsAPI } from "@api/jobSeeker";
import { SVG } from "@assets/svg";
import DeleteCard from "@components/deleteCard";
import DialogBox from "@components/dialogBox";
import { Stack } from "@mui/material";
import { setSuccessToast } from "@redux/slice/toast";
import { deleteWorkExperienceRecord } from "@redux/slice/user";
import { YEAR_FORMAT } from "@utils/constants/constants";
import { USER_ROLES } from "@utils/enum";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function WorkExperienceCard({
  id,
  title,
  startDate,
  endDate,
  present,
  organization,
  description,
  handleEdit,
  noOptions,
}) {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteWorkExperienceDetailsAPI(id);
    if (res.remote === "success") {
      dispatch(deleteWorkExperienceRecord(id));
      dispatch(setSuccessToast("Education Deleted Successfully"));
    } else {
      dispatch(setSuccessToast("Something went wrong"));
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
          <h6>{organization}</h6>
          {description ? (
            <>
              <p
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
                style={{
                  wordBreak: "break-all",
                }}
              />
              <br />
            </>
          ) : (
            ""
          )}
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
          title="Delete Work experience"
          content="Are you sure you want to delete Work experience?"
          handleCancel={() => setDeleting(false)}
          handleDelete={handleDelete}
          loading={loading}
        />
      </DialogBox>
    </>
  );
}

export default WorkExperienceCard;
