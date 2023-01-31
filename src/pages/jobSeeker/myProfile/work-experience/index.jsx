import { OutlinedButton } from "@components/button";
import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import DialogBox from "@components/dialogBox";
import WorkExperienceCard from "@components/workexperienceCard";
import CreateWorkExperience from "./createWorkExperience";

const workList = [
  {
    id: 1,
    role: "Freelancer",
    description: "Upwork",
    date: "May 2018 - Present",
  },
];

const WorkExperience = () => {
  const [open, setOpen] = useState(false);
  const [experiences, setExperiences] = useState([...workList]);
  const updateExperienceList = (obj, index) => {
    const temp = experiences;
    temp[index] = obj;
    setExperiences(temp);
  };

  const handleToggleModel = () => {
    setExperiences(!experiences);
  };

  const deleteExperience = (id) => {
    const temp = experiences.filter((val, index) => {
      return index !== id;
    });
    console.log(temp);
    setExperiences(temp);
  };

  const saveTask = (taskObj) => {
    const tempList = experiences;
    tempList.push(taskObj);
    setExperiences(experiences);
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
            <h2 className="mb-4">Work experience</h2>
            <ul className="listitems">
              {experiences.length > 0 ? (
                experiences.map((obj, index) => (
                  <li key={index}>
                    <WorkExperienceCard
                      taskObj={obj}
                      index={index}
                      deleteExperience={deleteExperience}
                      updateExperienceList={updateExperienceList}
                    />
                  </li>
                ))
              ) : (
                <h5>No Work experience</h5>
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
      <DialogBox open={open} handleToggleModel={handleToggleModel}>
        <CreateWorkExperience saveTask={saveTask} />
      </DialogBox>
    </>
  );
};
export default WorkExperience;
