import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import EducationCard from "@components/educationCard";
import AddEducation from "./addEducation";
import DialogBox from "@components/dialogBox";
import { useDispatch, useSelector } from "react-redux";
import { setEducationRecord } from "@redux/slice/user";
import { formatDateFunc } from "@utils/fakeData";
import { MODAL_TYPES } from "@utils/enum";
import { setModalOpen } from "@redux/slice/modal";
import EditEducation from "./editEducation";

const Education = () => {
  // redux dispatch and selector
  const dispatch = useDispatch();
  const educationData = useSelector(
    (state) => state.auth.currentUser.educationRecord
  );
  const modalType = useSelector((state) => state.modal.modalOpen);

  // state management
  const [editData, setEditData] = useState("");

  // handle modal toggle
  const handleToggleModel = (type = "") => {
    dispatch(setModalOpen(type));
  };

  // handle submit
  const handleSubmit = (value) => {
    const result = [...educationData] || [];
    dispatch(setEducationRecord([...result, value]));
    handleToggleModel();
  };

  // handle delete
  const handleDelete = (id) => {
    const filteredData = educationData?.filter((el) => el.id !== id);
    dispatch(setEducationRecord(filteredData));
  };

  // handle toggle edit modal
  const handleToggleEditModal = (id) => {
    const filteredData = educationData?.find((el) => el.id === id);
    handleToggleModel(MODAL_TYPES.editEducationModal);

    setEditData(filteredData);
  };

  // handle submit edited data
  const handleSubmitEditedData = (data) => {
    const result = educationData.map((item) =>
      item.id === data.id ? data : item
    );

    dispatch(setEducationRecord(result));
    dispatch(setModalOpen(""));
  };

  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "25px",
            },
          }}
        >
          <div className="add-content">
            <h2 className="mb-4">Education</h2>
            <ul className="listitems">
              {educationData?.map((item) => (
                <li key={item.id}>
                  <EducationCard
                    title={item.degree}
                    description={item.description}
                    startYear={formatDateFunc(item.startDate)}
                    endYear={formatDateFunc(item.endDate)}
                    organization={item.organization}
                    isPresent={item.isPresent}
                    handleDelete={() => handleDelete(item.id)}
                    handleEdit={() => handleToggleEditModal(item.id)}
                  />
                </li>
              ))}
            </ul>

            <div className="text-center mt-4">
              <OutlinedButton
                onClick={() => handleToggleModel(MODAL_TYPES.addEducationModal)}
                title={
                  <>
                    <span className="me-2 d-inline-flex">
                      <SVG.PlushIcon />
                    </span>
                    Add education
                  </>
                }
                sx={{
                  "&.MuiButtonBase-root": {
                    border: "1px solid #EEA23D !important",
                    color: "#EEA23D !important",
                    fontSize: "16px",
                    padding: "6px 30px !important",
                    "&:hover": { background: "#eea23d14" },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                      fontSize: "14px",
                    },
                  },
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {modalType === MODAL_TYPES.addEducationModal && (
        <DialogBox
          open={modalType === MODAL_TYPES.addEducationModal}
          handleClose={() => handleToggleModel()}
        >
          <AddEducation handleSubmit={(data) => handleSubmit(data)} />
        </DialogBox>
      )}

      {modalType === MODAL_TYPES.editEducationModal && (
        <DialogBox
          open={modalType === MODAL_TYPES.editEducationModal}
          handleClose={() => handleToggleModel()}
        >
          <EditEducation
            editData={editData}
            handleSubmit={(data) => handleSubmitEditedData(data)}
          />
        </DialogBox>
      )}
    </>
  );
};

export default Education;
