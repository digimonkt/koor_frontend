import { OutlinedButton } from "@components/button";
import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import DialogBox from "@components/dialogBox";
import WorkExperienceCard from "@components/workexperienceCard";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPES } from "@utils/enum";
import { setModalOpen } from "@redux/slice/modal";
import { setWorkExperience } from "@redux/slice/user";
import { formatDateFunc } from "@utils/fakeData";
import EditWorkExperience from "./editWorkExperience";

const WorkExperience = () => {
  // redux dispatch and selector
  const dispatch = useDispatch();
  const workExperienceData = useSelector(
    (state) => state.auth.currentUser.workExperience
  );

  const modalType = useSelector((state) => state.modal.modalOpen);

  // state management
  const [editData, setEditData] = useState("");

  // handle modal toggle
  const handleToggleModel = (type = "") => {
    dispatch(setModalOpen(type));
  };

  // handle delete
  const handleDelete = (id) => {
    const filteredData = workExperienceData?.filter((el) => el.id !== id);
    dispatch(setWorkExperience(filteredData));
  };

  // handle toggle edit modal
  const handleToggleEditModal = (id) => {
    const filteredData = workExperienceData?.find((el) => el.id === id);
    handleToggleModel(MODAL_TYPES.editworkExperienceModal);

    setEditData(filteredData);
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
            <h2 className="mb-4">Work experience</h2>
            <ul className="listitems">
              {workExperienceData?.map((item) => (
                <li key={item.id}>
                  <WorkExperienceCard
                    title={item.title}
                    organization={item.organization}
                    startDate={formatDateFunc(item.startDate)}
                    endDate={formatDateFunc(item.endDate)}
                    isPresent={item.isPresent}
                    description={item.description}
                    handleDelete={() => handleDelete(item.id)}
                    handleEdit={() => handleToggleEditModal(item.id)}
                  />
                </li>
              ))}
            </ul>

            <div className="text-center mt-4">
              <OutlinedButton
                onClick={() =>
                  handleToggleModel(MODAL_TYPES.editworkExperienceModal)
                }
                title={
                  <>
                    <span className="me-2 d-inline-flex">
                      <SVG.PlushIcon />
                    </span>
                    Add work experience
                  </>
                }
                sx={{
                  "&.MuiButton-outlined": {
                    border: "1px solid #EEA23D !important",
                    color: "#EEA23D !important",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "6px 30px",
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

      {modalType === MODAL_TYPES.editworkExperienceModal && (
        <DialogBox
          open={modalType === MODAL_TYPES.editworkExperienceModal}
          handleClose={() => handleToggleModel()}
        >
          <EditWorkExperience
            editData={editData}
            handleClose={() => handleToggleModel()}
            buttonTitle={
              editData ? "Edit Work Experience" : "Add Work Experience"
            }
            modalTitle={
              editData ? "Update Work Experience" : "Add Work Experience"
            }
          />
        </DialogBox>
      )}
    </>
  );
};
export default WorkExperience;
