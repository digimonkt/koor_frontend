import { Card, CardContent } from "@mui/material";
import React from "react";
import { SVG } from "../../../../assets/svg";
import ModalView from "../../updateProfile/modal";
import UpdateInfo from "../../updateProfile/modal/update-info";
import { Cbutton } from "../../../../components/button";
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
              <Cbutton
                onClick={handleClickOpen}
                variant="outlined"
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
                Add work experience
              </Cbutton>
            </div>
          </div>
        </CardContent>
      </Card>
      <ModalView
        open={open}
        handleClose={handleClose}
        content={
          <UpdateInfo
            title="Work Experience"
            color="#EEA23D"
            bgcolor="#FEEFD3"
            icon={<SVG.WorkIcon />}
            description={[
              <>
                <p>
                  Where have you worked before? In what companies, on what role
                  with what responsibilities? Feel free to share to make your
                  profile more complete and attractive for potential employers.
                </p>
              </>,
            ]}
            buttonHover="#eea23d14"
            handleClose={handleClose}
            buttontext={
              <>
                <span className="me-3 d-inline-flex">
                  <SVG.PlushIcon />
                </span>{" "}
                Add work experience
              </>
            }
          />
        }
      />
    </>
  );
};
export default WorkExperience;
