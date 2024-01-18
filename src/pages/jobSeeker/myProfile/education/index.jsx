import { Card, CardContent, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "../../../../assets/svg";
import { OutlinedButton } from "../../../../components/button";
import EducationCard from "../../../../components/educationCard";
import EditEducation from "./editEducation";
import DialogBox from "../../../../components/dialogBox";
import { useSelector } from "react-redux";
import NoItem from "../noItem";
import { Capacitor } from "@capacitor/core";
const Education = (props) => {
  const platform = Capacitor.getPlatform();

  const {
    currentUser: { educationRecord },
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
            <Stack
              spacing={2}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <h2 className="mb-0">Education</h2>
              {platform === "android" || platform === "ios" ? (
                <IconButton
                  size="small"
                  onClick={() => props.fun()}
                  sx={{ "& svg": { width: "18px", height: "11px" } }}
                >
                  {props.toggle ? <SVG.ArrowUpIcon /> : <SVG.Downarrow />}
                </IconButton>
              ) : null}
            </Stack>
            {platform === "android" || platform === "ios" ? (
              <>
                {props.toggle ? (
                  <div>
                    <>
                      {educationRecord.length ? (
                        <ul className="listitems mt-4">
                          {educationRecord.map((item, index) => (
                            <li
                              key={index}
                              style={{
                                borderBottom:
                                  index !== educationRecord.length - 1
                                    ? "1px solid #cacaca"
                                    : "",
                              }}
                            >
                              <EducationCard
                                {...item}
                                handleEdit={() => handleEdit(item)}
                              />
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <>
                          <div>
                            <NoItem
                              icon={<SVG.EducationIcon />}
                              description={
                                <p>
                                  Mentioning your education helps to prove your
                                  proficiency for your future employer. Add it
                                  to boost your job bids. That how we can
                                  display empty cards – icon and some tips to
                                  fill up the info.
                                </p>
                              }
                            />
                          </div>
                        </>
                      )}
                    </>

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
                ) : (
                  ""
                )}
              </>
            ) : (
              <div>
                <>
                  {educationRecord.length ? (
                    <ul className="listitems mt-4">
                      {educationRecord.map((item, index) => (
                        <li
                          key={index}
                          style={{
                            borderBottom:
                              index !== educationRecord.length - 1
                                ? "1px solid #cacaca"
                                : "",
                          }}
                        >
                          <EducationCard
                            {...item}
                            handleEdit={() => handleEdit(item)}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <div>
                        <NoItem
                          icon={<SVG.EducationIcon />}
                          description={
                            <p>
                              Mentioning your education helps to prove your
                              proficiency for your future employer. Add it to
                              boost your job bids. That how we can display empty
                              cards – icon and some tips to fill up the info.
                            </p>
                          }
                        />
                      </div>
                    </>
                  )}
                </>

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
            )}
          </div>
        </CardContent>
      </Card>
      <DialogBox open={open} handleClose={handleToggleModel}>
        <EditEducation
          handleSubmit={handleSubmit}
          currentSelected={currentSelected}
          handleClose={handleToggleModel}
        />
      </DialogBox>
    </>
  );
};

export default Education;
