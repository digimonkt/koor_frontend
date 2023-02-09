import { OutlinedButton } from "@components/button";
import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import LanguageCard from "@components/languageCard";
import DialogBox from "@components/dialogBox";
// import AddLanguages from "./addLanguages";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "@redux/slice/modal";
import { MODAL_TYPES } from "@utils/enum";
import { setLanguages } from "@redux/slice/user";
import EditLanguages from "./editLanguage";

const Languages = () => {
  // redux dispatcher and selector
  const dispatch = useDispatch();
  const languageData = useSelector((state) => state.auth.currentUser.languages);
  const modalType = useSelector((state) => state.modal.modalOpen);

  // state management

  const [editedData, setEditedData] = useState("");

  // handle modal toggle
  const handleToggleModel = (type = "") => {
    dispatch(setModalOpen(type));
  };

  // handle delete
  const handleDelete = (id) => {
    const filteredData = languageData.filter((el) => el.id !== id);
    dispatch(setLanguages(filteredData));
  };

  // handle toogle edit modal
  const handleToogleEditModal = (id) => {
    const filteredData = languageData?.find((el) => el.id === id);
    handleToggleModel(MODAL_TYPES.editLanguageModal);

    setEditedData(filteredData);
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
            <h2 className="mb-4">Languages</h2>
            <ul className="listitems">
              {languageData.map((item) => (
                <li key={item.id}>
                  {
                    <LanguageCard
                      title={item.language}
                      spoken={item.spoken}
                      written={item.written}
                      handleDelete={() => handleDelete(item.id)}
                      handleEdit={() => handleToogleEditModal(item.id)}
                    />
                  }
                </li>
              ))}
            </ul>
            <div className="text-center mt-4">
              <OutlinedButton
                title={
                  <>
                    <span className="me-2 d-inline-flex">
                      <SVG.PlushIcon />
                    </span>
                    Add language
                  </>
                }
                onClick={() => handleToggleModel(MODAL_TYPES.editLanguageModal)}
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

      {modalType === MODAL_TYPES.editLanguageModal && (
        <DialogBox
          open={modalType === MODAL_TYPES.editLanguageModal}
          handleClose={handleToggleModel}
        >
          <EditLanguages
            handleClose={() => handleToggleModel()}
            updateData={editedData}
            buttonTitle={editedData ? "Edit Language" : "Add Language"}
            modalTitle={editedData ? "Update Language" : "Add Language"}
          />
        </DialogBox>
      )}
    </>
  );
};
export default Languages;
