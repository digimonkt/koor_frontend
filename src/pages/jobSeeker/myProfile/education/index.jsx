import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import EducationCard from "@components/educationCard";
import EditEducation from "./editEducation";
import DialogBox from "@components/layout/dialogBox";

const educationList = [
  {
    title: "Degree",
    organization: "Cambridge University",
    startYear: 2001,
    endYear: null,
    isPresent: true,
    description: "THis is the description",
  },
];

const Education = () => {
  const [open, setOpen] = useState(false);

  const [educations, setEducations] = useState([...educationList]);

  const handleToggleModel = () => {
    setOpen(!open);
  };

  const handleSubmit = (value) => {
    console.log(value);
    setEducations((prevState) => [...prevState, value]);
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
            <h2 className="mb-4">Education</h2>
            <ul className="listitems">
              {educations.map((item, index) => (
                <li key={index}>
                  <EducationCard {...item} />
                </li>
              ))}
            </ul>

            <div className="text-center mt-4">
              <OutlinedButton
                onClick={handleToggleModel}
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
      <DialogBox open={open} handleClose={handleToggleModel}>
        <EditEducation handleSubmit={handleSubmit} />
      </DialogBox>
    </>
  );
};

export default Education;
