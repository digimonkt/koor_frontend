import { OutlinedButton } from "@components/button";
import { Card, CardContent } from "@mui/material";
import React from "react";
import { SVG } from "@assets/svg";
// import ModalView from "../../updateProfile/modal";
// import UpdateInfo from "../../updateProfile/modal/update-info";
import DialogBox from "@components/dialogBox";
import EditWorkExperience from "./editWorkExperience";
const WorkExperience = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const workList = [
    {
      title: "Freelancer",
      subtitle: "Upwork",
      date: "May 2018 - Present",
    },
    {
      title: "Lead UX/UI Designer",
      subtitle: "Another company",
      date: "January 2022 - September 2022",
    },
    {
      title: "Senior UX/UI Designer",
      subtitle: (
        <>
          Koor
          <br />
          Key responsibilities text. For example, assist in th preparation of
          regularly scheduled reports. Testing two lines of text.
        </>
      ),
      date: "January 2022 - September 2022",
    },
    {
      title: "No job",
      subtitle: (
        <>
          Another company <br />
          Only a few key responsibilities.
        </>
      ),
      date: "January 2022 - September 2022",
    },
    {
      title: "Test of many jobs",
      subtitle: "Google",
      date: "January 2022 - September 2022",
    },
  ];
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
              {workList.map((item, index) => (
                <li key={index}>{/* <CardList {...item} /> */}</li>
              ))}
            </ul>

            <div className="text-center mt-4">
              <OutlinedButton
                title={
                  <>
                    <span className="me-2 d-inline-flex">
                      <SVG.PlushIcon />
                    </span>
                    Add work experience
                  </>
                }
                onClick={handleClickOpen}
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
      <DialogBox open={open} handleClose={handleClose}>
        <EditWorkExperience />
      </DialogBox>
    </>
  );
};
export default WorkExperience;
