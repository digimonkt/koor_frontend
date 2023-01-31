import { OutlinedButton } from "@components/button";
import { Card, CardContent } from "@mui/material";
import React from "react";
import { SVG } from "@assets/svg";
import LanguageCard from "@components/languageCard";
import DialogBox from "@components/dialogBox";
import EditLanguages from "./editLanguages";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "@redux/slice/modal";
import { MODAL_TYPES } from "@utils/enum";

const Languages = () => {
  // redux dispatcher and selector
  const dispatch = useDispatch();
  const languageData = useSelector((state) => state.auth.currentUser.languages);
  const modalType = useSelector((state) => state.modal.modalOpen);

  // state management
  // handle modal toggle
  const handleToggleModel = (type = "") => {
    dispatch(setModalOpen(type));
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
              {languageData.map((item, index) => (
                <li key={index}>{<LanguageCard />}</li>
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
                onClick={() => handleToggleModel(MODAL_TYPES.addLanguageModal)}
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
      {modalType === MODAL_TYPES.addLanguageModal && (
        <DialogBox
          open={modalType === MODAL_TYPES.addLanguageModal}
          handleClose={handleToggleModel}
        >
          <EditLanguages />
        </DialogBox>
      )}
    </>
  );
};
export default Languages;
