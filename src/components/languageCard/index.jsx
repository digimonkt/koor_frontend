import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SVG } from "@assets/svg";
import { USER_ROLES } from "@utils/enum";
import { deleteLanguageDetailsAPI } from "@api/jobSeeker";
import { deleteLanguageRecord } from "@redux/slice/user";
import { setSuccessToast } from "@redux/slice/toast";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/deleteCard";

function LanguageCard({ id, language, spoken, written, handleEdit }) {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteLanguageDetailsAPI(id);
    if (res.remote === "success") {
      dispatch(deleteLanguageRecord(id));
      dispatch(setSuccessToast("Language Delete Successfully"));
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
          <h5>{language.title}</h5>
          <span>Spoken: {spoken}</span> <br />
          <span>Written: {written}</span> <br />
        </div>
        {role === USER_ROLES.jobSeeker && (
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
        )}
      </Stack>
      <DialogBox open={deleting} handleClose={() => setDeleting(false)}>
        <DeleteCard
          title="Delete Language"
          content="Are you sure you want to delete language?"
          handleCancel={() => setDeleting(false)}
          handleDelete={handleDelete}
          loading={loading}
        />
      </DialogBox>
    </>
  );
}

export default LanguageCard;
