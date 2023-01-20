import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "../../../../assets/svg";
import ModalView from "../../updateProfile/modal";
import { Cbutton } from "../../../../components/button";
import EducationCard from "../../../../components/educationCard";
import EditEducation from "./editEducation";

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
              <Cbutton
                variant="outlined"
                onClick={handleToggleModel}
                sx={{
                  "&.MuiButton-outlined": {
                    borderRadius: "73px",
                    border: "1px solid #EEA23D",
                    color: "#EEA23D",
                    fontWeight: "500",
                    fontSize: "16px",
                    fontFamily: "Bahnschrift",
                    padding: "6px 30px",

                    "&:hover": { background: "#eea23d14" },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                      fontSize: "14px",
                    },
                  },
                }}
              >
                <span className="me-2 d-inline-flex">
                  <SVG.PlushIcon />
                </span>
                Add education
              </Cbutton>
            </div>
          </div>
        </CardContent>
      </Card>
      <ModalView
        open={open}
        handleClose={handleToggleModel}
        content={<EditEducation handleSubmit={handleSubmit} />}
      />
    </>
  );
};
export default Education;
