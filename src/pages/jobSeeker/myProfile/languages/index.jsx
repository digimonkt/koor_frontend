import { OutlinedButton } from "@components/button";
import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import DialogBox from "@components/dialogBox";
import EditLanguages from "./editLanguages";
import NoItem from "../noItem";
import { useSelector } from "react-redux";
import LanguageCard from "@components/languageCard";

const Languages = () => {
  const {
    currentUser: { languages },
  } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(null);

  const handleToggleModel = () => {
    setOpen(!open);
    if (open) {
      setCurrentSelected(null);
    }
  };

  const handleSubmit = () => {
    handleToggleModel();
  };

  const handleEdit = (value) => {
    setCurrentSelected(value);
    handleToggleModel();
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
              {languages.length ? (
                languages.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      borderBottom:
                        index !== languages.length - 1
                          ? "1px solid #cacaca"
                          : "",
                    }}
                  >
                    <LanguageCard
                      {...item}
                      handleEdit={() => handleEdit(item)}
                    />
                  </li>
                ))
              ) : (
                <div>
                  <NoItem
                    icon={<SVG.LanguageIcon />}
                    description={
                      <p>
                        Add languages that your can speak or write. This will be
                        helpful in multi-cultural or tourist regions.
                      </p>
                    }
                  />
                </div>
              )}
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
                onClick={handleToggleModel}
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
      <DialogBox open={open} handleClose={handleToggleModel}>
        <EditLanguages
          handleSubmit={handleSubmit}
          currentSelected={currentSelected}
          handleClose={handleToggleModel}
        />
      </DialogBox>
    </>
  );
};
export default Languages;
