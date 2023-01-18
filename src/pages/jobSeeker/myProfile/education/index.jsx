import { Card, CardContent } from "@mui/material";
import React from "react";
import { SVG } from "../../../../assets/svg";
import ModalView from "../../updateProfile/modal";
import UpdateInfo from "../../updateProfile/modal/update-info";
import { Cbutton } from "../../../../components/button";
import CardList from "./cardlist";

const educationList = [
  {
    title: "Degree",
    subtitle: "Cambridge University",
    date: "2017 - 2022",
  },
  {
    title: "Senior UX/UI Designer",
    subtitle: (
      <>
        koor <br /> Key responsibilities text. For example, assist in th
        preparation of regularly scheduled reports. Testing two lines of text.
      </>
    ),

    date: "2017 - 2022",
  },
];

const Education = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
            <h2 className="mb-4">Education</h2>
            <ul className="listitems">
              {educationList.map((item, index) => (
                <li key={index}>
                  <CardList {...item} />
                </li>
              ))}
            </ul>

            <div className="text-center mt-4">
              <Cbutton
                variant="outlined"
                onClick={handleClickOpen}
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
        handleClose={handleClose}
        content={
          <UpdateInfo
            title="Education"
            color="#EEA23D"
            bgcolor="#FEEFD3"
            icon={<SVG.EducationIcon />}
            description={[
              <>
                <p>
                  Mentioning your education helps to prove your proficiency for
                  your future employer. Add it to boost your job bids. That how
                  we can display empty cards – icon and some tips to fill up the
                  info.
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
                Add education
              </>
            }
          />
        }
      />
    </>
  );
};
export default Education;
