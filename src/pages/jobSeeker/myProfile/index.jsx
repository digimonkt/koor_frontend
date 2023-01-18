import {
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  Stack,
  StepConnector,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import { Cbutton } from "../../../components/button";
import { SVG } from "../../../assets/svg";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { stepContents } from "./ProfileHelper";
import { Link } from "react-router-dom";
import EmployerProfile from "../../employer/myProfile";

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
    font-family: "Poppins";
    font-weight: 500;
  }
  &.MuiInputBase-root {
    border-radius: 10px;
  }
  & fieldset {
    display: none;
  }
`;
export const FormLabelBox = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;

    letter-spacing: 0.02em;

    color: #121212;
  }
`;

const MyProfile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const role = localStorage.getItem("role");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [city, setCity] = useState("");
  const handleCity = (event) => {
    setCity(event.target.value);
  };
  const CheckBox = ({ onChange, value }) => {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    return (
      <Checkbox
        icon={<>{SVG.UncheckICon}</>}
        checkedIcon={<>{SVG.CheckBoxIcon}</>}
        checked={value}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
        {...label}
        sx={{
          color: "#CACACA",
          transition: "all 0.5s ease-out",
          padding: "0px",
          "&.Mui-checked": {
            color: "#EEA23D",
            transition: "all 0.5s ease-out",
          },
        }}
      />
    );
  };

  const StepCheckMarks = ({ options, title, id }) => {
    const [showContent, setShowContent] = useState(false);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [currentSelected, setCurrentSeleted] = useState(new Set());
    useEffect(() => {
      let isPresent = true;
      for (let i = 0; i < options.length; i++) {
        if (currentSelected.has(options[i].id)) {
          continue;
        } else {
          isPresent = false;
          break;
        }
      }
      if (!isPresent) setIsAllSelected(false);
      else setIsAllSelected(true);
    }, [currentSelected, options]);

    return (
      <div className="according-content-box border-top py-3">
        <Stack direction="row" spacing={2} alignItems="center">
          <CheckBox
            onChange={(e) => {
              setShowContent(true);
              setIsAllSelected(e.target.checked);
              if (e.target.checked) {
                const newSet = new Set(currentSelected);
                options.forEach((option) => newSet.add(option.id));
                setCurrentSeleted(newSet);
              } else {
                setCurrentSeleted(new Set());
              }
            }}
            value={isAllSelected}
          />
          <h2 className="mb-0">{title}</h2>
          <span
            className={`ms-auto arrow-color ${showContent ? "active" : null}`}
            onClick={() => setShowContent(!showContent)}
          >
            {SVG.ArrowUpIcon}
          </span>
        </Stack>
        {showContent ? (
          <div className="according-content">
            <ul>
              {options.map((option) => {
                return (
                  <li key={option.id}>
                    <CheckBox
                      value={currentSelected.has(option.id)}
                      onChange={(e) => {
                        const newSet = new Set(currentSelected);
                        if (newSet.has(option.id)) {
                          newSet.delete(option.id);
                        } else {
                          newSet.add(option.id);
                        }
                        setCurrentSeleted(newSet);
                      }}
                    />
                    <span className="ms-2">{option.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <>
      {role === "jobSeeker" ? (
        <>
          <div>
            <h1 className="headding">Select your desired job criterias</h1>
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
                    paddingBottom: "16px",
                  },
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Stepper activeStep={activeStep} className="step-continer">
                    <Step>
                      <StepLabel icon={<>{SVG.OneIcon}</>}>
                        Categories
                      </StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Additional parameters</StepLabel>
                    </Step>
                    <StepConnector />
                  </Stepper>
                  {activeStep === 0 ? (
                    <div className="p-3">
                      {stepContents.map((item) => {
                        return <StepCheckMarks key={item.id} {...item} />;
                      })}

                      <div className="text-center border-top pt-5">
                        <Cbutton
                          onClick={handleNext}
                          variant="outlined"
                          sx={{
                            "&.MuiButton-outlined": {
                              borderRadius: "73px",
                              border: "1px solid #EEA23D",
                              color: "#EEA23D",
                              fontWeight: "500",
                              fontSize: "16px",
                              fontFamily: "Bahnschrift",
                              padding: "10px 30px",
                              "&:hover": {
                                background: "rgba(255, 165, 0, 0.1)",
                              },
                            },
                          }}
                        >
                          Next <span className="ms-2">{SVG.StartIcon}</span>
                        </Cbutton>
                      </div>
                    </div>
                  ) : activeStep === 1 ? (
                    <div className="p-3">
                      <Divider />
                      <div className="py-3 additional-box">
                        <Grid container spacing={2}>
                          <Grid item md={6} xs={12}>
                            <FormControl fullWidth size="small">
                              <label className="d-block mb-2">Country</label>
                              <SelectBox
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                IconComponent={KeyboardArrowUpIcon}
                              >
                                <MenuItem value="" className="selectlabel">
                                  Netherlands
                                </MenuItem>
                                <MenuItem value={10}>Others</MenuItem>
                              </SelectBox>
                            </FormControl>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <FormControl fullWidth size="small">
                              <label className="d-block mb-2">City</label>
                              <SelectBox
                                value={city}
                                onChange={handleCity}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                IconComponent={KeyboardArrowUpIcon}
                              >
                                <MenuItem value="">
                                  <em
                                    style={{
                                      color: "#848484",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                    }}
                                  >
                                    {" "}
                                    Choose city
                                  </em>
                                </MenuItem>
                                <MenuItem value={10}>Scheveningen</MenuItem>
                                <MenuItem value={11}>Katwijk</MenuItem>
                                <MenuItem value={12}>Leiden</MenuItem>
                                <MenuItem value={13}>Lisse</MenuItem>
                                <MenuItem value={14}>Rijswijk</MenuItem>
                              </SelectBox>
                            </FormControl>
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <Divider className="my-3" />
                            <label
                              className="d-block"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              Job type
                            </label>
                            <FormGroup row>
                              <FormLabelBox
                                control={
                                  <Checkbox
                                    icon={<>{SVG.UncheckICon}</>}
                                    checkedIcon={<>{SVG.CheckBoxIcon}</>}
                                    defaultChecked
                                    sx={{
                                      color: "#CACACA",
                                      transition: "all 0.5s ease-out",
                                      padding: "0px",
                                      "&.Mui-checked": {
                                        color: "#EEA23D",
                                        transition: "all 0.5s ease-out",
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <span className="ms-2 me-3 check-label">
                                    Part Time
                                  </span>
                                }
                              />
                              <FormLabelBox
                                icon={<>{SVG.UncheckICon}</>}
                                checkedIcon={<>{SVG.CheckBoxIcon}</>}
                                disabled
                                control={
                                  <Checkbox
                                    sx={{
                                      color: "#CACACA",
                                      transition: "all 0.5s ease-out",
                                      padding: "0px",
                                      "&.Mui-checked": {
                                        color: "#EEA23D",
                                        transition: "all 0.5s ease-out",
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <span className="ms-2 me-3 check-label">
                                    Full Time
                                  </span>
                                }
                              />
                              <FormLabelBox
                                control={
                                  <Checkbox
                                    icon={<>{SVG.UncheckICon}</>}
                                    checkedIcon={<>{SVG.CheckBoxIcon}</>}
                                    defaultChecked
                                    sx={{
                                      color: "#CACACA",
                                      transition: "all 0.5s ease-out",
                                      padding: "0px",
                                      "&.Mui-checked": {
                                        color: "#EEA23D",
                                        transition: "all 0.5s ease-out",
                                      },
                                    }}
                                  />
                                }
                                label=<span className="ms-2 me-3 check-label">
                                  Contract
                                </span>
                              />
                            </FormGroup>
                            <Divider className="my-3" />
                          </Grid>
                        </Grid>
                      </div>
                      <div className="text-center">
                        <Cbutton
                          variant="outlined"
                          component={Link}
                          to="/profile/add-info"
                          sx={{
                            "&.MuiButton-outlined": {
                              borderRadius: "73px",
                              border: "1px solid #EEA23D",
                              color: "#EEA23D",
                              fontWeight: "500",
                              fontSize: "16px",
                              fontFamily: "Bahnschrift",
                              padding: "10px 30px",

                              "&:hover": {
                                background: "rgba(255, 165, 0, 0.1)",
                              },
                            },
                          }}
                        >
                          <span className="me-2 d-inline-flex">
                            {SVG.CheckIcon}
                          </span>{" "}
                          Done
                        </Cbutton>
                      </div>
                    </div>
                  ) : null}
                </Box>
              </CardContent>
            </Card>
          </div>
        </>
      ) : role === "vender" ? (
        <EmployerProfile />
      ) : role === "employer" ? (
        <>
          <EmployerProfile />
        </>
      ) : null}
    </>
  );
};
export default MyProfile;
