import { OutlinedButton } from "@components/button";
import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import CreateLanguages from "./createLanguages";
import LanguageCard from "@components/languageCard";
import DialogBox from "@components/dialogBox";

const langugesList = [
  {
    id: 1,
    language: "Hindi",
    spoken: "Hindi, English",
    written: "Hindi, English",
  },
];

const Languages = () => {
  const [open, setOpen] = useState(false);
  const [languages, setLanguages] = useState([...langugesList]);
  const updateLanguageList = (obj, index) => {
    const temp = languages;
    temp[index] = obj;
    setLanguages(temp);
  };

  const handleToggleModel = () => {
    setLanguages(!languages);
  };

  const deleteLanguage = (id) => {
    const temp = languages.filter((val, index) => {
      return index !== id;
    });
    console.log(temp);
    setLanguages(temp);
  };

  const saveTask = (taskObj) => {
    const tempList = languages;
    tempList.push(taskObj);
    setLanguages(languages);
    setOpen(false);
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
              {languages.length > 0 ? (
                languages.map((obj, index) => (
                  <li key={index}>
                    <LanguageCard
                      taskObj={obj}
                      index={index}
                      deleteLanguage={deleteLanguage}
                      updateLanguageList={updateLanguageList}
                    />
                  </li>
                ))
              ) : (
                <h5>No languages</h5>
              )}
            </ul>
            <div className="text-center mt-4">
              <OutlinedButton
                onClick={() => setOpen(true)}
                title={
                  <>
                    <span className="me-2 d-inline-flex">
                      <SVG.PlushIcon />
                    </span>
                    Add language
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
      <DialogBox open={open} handleToggleModel={handleToggleModel}>
        <CreateLanguages saveTask={saveTask} />
      </DialogBox>
    </>
  );
};
export default Languages;
