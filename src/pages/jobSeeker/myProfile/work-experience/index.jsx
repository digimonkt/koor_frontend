import { OutlinedButton } from "../../../../components/button";
import { Card, CardContent, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "../../../../assets/svg";
import DialogBox from "../../../../components/dialogBox";
import EditWorkExperience from "./editWorkExperience";
import { useSelector } from "react-redux";
import NoItem from "../noItem";
import WorkExperienceCard from "../../../../components/workExperienceCard";
import { Capacitor } from "@capacitor/core";
const WorkExperience = (props) => {
  const platform = Capacitor.getPlatform();
  const {
    currentUser: { workExperiences },
  } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(null);
  const handleToggleModel = (props) => {
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
            <Stack
              spacing={2}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <h2 className="mb-0">Work experience</h2>
              {platform === "android" || platform === "ios" ? (
                <IconButton size="small" onClick={() => props.fun()}>
                  <SVG.ArrowUpIcon />
                </IconButton>
              ) : null}
            </Stack>
            {platform === "android" || platform === "ios" ? (
              <div>
                {props.toggle ? (
                  <>
                    <ul className="listitems mt-4">
                      {workExperiences.length ? (
                        workExperiences.map((item, index) => (
                          <li
                            key={index}
                            style={{
                              borderBottom:
                                index !== workExperiences.length - 1
                                  ? "1px solid #cacaca"
                                  : "",
                            }}
                          >
                            <WorkExperienceCard
                              {...item}
                              handleEdit={() => handleEdit(item)}
                            />
                          </li>
                        ))
                      ) : (
                        <NoItem
                          icon={<SVG.WorkIcon />}
                          description={
                            <p>
                              Where have you worked before? In what companies,
                              on what role with what responsibilities? Feel free
                              to share to make your profile more complete and
                              attractive for potential employers.
                            </p>
                          }
                        />
                      )}
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
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <>
                <ul className="listitems mt-4">
                  {workExperiences.length ? (
                    workExperiences.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          borderBottom:
                            index !== workExperiences.length - 1
                              ? "1px solid #cacaca"
                              : "",
                        }}
                      >
                        <WorkExperienceCard
                          {...item}
                          handleEdit={() => handleEdit(item)}
                        />
                      </li>
                    ))
                  ) : (
                    <NoItem
                      icon={<SVG.WorkIcon />}
                      description={
                        <p>
                          Where have you worked before? In what companies, on
                          what role with what responsibilities? Feel free to
                          share to make your profile more complete and
                          attractive for potential employers.
                        </p>
                      }
                    />
                  )}
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
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <DialogBox
        open={open}
        handleClose={handleToggleModel}
        sx={{
          "& .MuiPaper-root": {
            width: "800px",
            maxWidth: "857px",
          },
        }}
      >
        <EditWorkExperience
          handleSubmit={handleSubmit}
          currentSelected={currentSelected}
          handleClose={handleToggleModel}
        />
      </DialogBox>
    </>
  );
};
export default WorkExperience;
