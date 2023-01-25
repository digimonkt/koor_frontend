import { Card, CardContent, Chip, Stack } from "@mui/material";
import React from "react";
import { SVG } from "@assets/svg";
import UpdateInfo from "../../updateProfile/update-info";
import DialogBox from "@components/dialogBox";
import { OutlinedButton } from "@components/button";

const Skills = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  const skillsList = [
    "UI/UX",
    "Class B / B1 / B2 ",
    "Cosmetics",
    "Beauty Treatments",
    "Makeup & Styling",
    "Calls",
    "Event Management",
    "Stock Taking",
    "Very long skill pill for test",
    "Animation",
    "Long skill to test how much we can fit",
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
            <h2>Skills</h2>
            <p>Maximum 15 skills</p>
            <Stack direction="row" spacing={0} flexWrap="wrap">
              {skillsList.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onClick={handleClick}
                  onDelete={handleDelete}
                  deleteIcon={<SVG.CancelIcon />}
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Poppins",
                    color: "#121212",
                    fontWeight: "400",
                    padding: "5px 10px 5px 20px",
                    margin: "0px 8px 8px 0px",
                  }}
                />
              ))}
            </Stack>

            <div className="skills-input mt-3">
              <input
                type="text"
                placeholder="Start typing a skill to add a new one"
              />
            </div>

            <div className="text-center mt-4">
              <OutlinedButton
                title={
                  <>
                    <span className="me-2 d-inline-flex">
                      <SVG.Savefile />
                    </span>
                    save Skills
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
        <UpdateInfo
          title="Skills"
          color="#EEA23D"
          bgcolor="#FEEFD3"
          icon={<SVG.SkillsIcon />}
          description={[
            <>
              <p>
                List your skills that you think will be usefull for a jobs
                you’re looking for. Highlight your strenghts and remember to be
                honest.
              </p>
            </>,
          ]}
          buttonHover="#eea23d14"
          handleClose={handleClose}
          buttontext={
            <>
              <span className="me-3 d-inline-flex">
                <SVG.EditIcon />
              </span>
              Edit skills
            </>
          }
        />
      </DialogBox>
    </>
  );
};
export default Skills;
