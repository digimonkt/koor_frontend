import { Divider, FormControl, FormGroup, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "../../../assets/svg";
import { OutlinedButton } from "../../../components/button";
import { CheckboxInput, SelectInput } from "../../../components/input";
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../../redux/slice/choices";
import { FormControlReminder } from "../../../components/style";
import { UpdateJobSeekerAdditionalParametersAPI } from "../../../api/jobSeeker";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "../../../utils/enum";
import { updateCurrentUser } from "../../../redux/slice/user";
import { Capacitor } from "@capacitor/core";
import { getCountries } from "@api/countries";

const AdditionalParameter = ({ handleChange, age, city, handleCity }) => {
  const platform = Capacitor.getPlatform();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    choices: { cities },
    auth: { currentUser },
  } = useSelector((state) => state);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [jobType, setJobType] = useState({
    partTime: false,
    fullTime: false,
    contract: false,
  });

  const getCountriesList = async () =>
    await getCountries().then((res) => setCountries(res));

  const handleSaveAdditionalParameters = async () => {
    const payload = {
      is_part_time: jobType.partTime,
      is_full_time: jobType.fullTime,
      has_contract: jobType.contract,
      country: selectedCountry,
      city: selectedCity,
    };
    if (!payload.country) {
      delete payload.country;
    }
    if (!payload.city) {
      delete payload.city;
    }
    const res = await UpdateJobSeekerAdditionalParametersAPI(payload);
    if (res.remote === "success") {
      dispatch(
        updateCurrentUser({
          jobPreferences: {
            isPartTime: payload.is_part_time,
            isFullTime: payload.is_full_time,
            hasContract: payload.has_contract,
          },
          profile: {
            country: countries.find(
              (country) => country.id === payload.country
            ),
            city: cities.data[payload.country].find(
              (city) => city.id === payload.city
            ),
          },
        })
      );
      navigate(`/${USER_ROLES.jobSeeker}/my-profile/update-profile`);
    }
  };
  useEffect(() => {
    if (!countries.length) {
      getCountriesList();
    }
    if (currentUser.profile.country?.id) {
      setSelectedCountry(currentUser.profile.country?.id);
    }
    if (currentUser.profile.city?.id) {
      setSelectedCity(currentUser.profile.city?.id);
    }
    setJobType({
      partTime: currentUser.jobPreferences.isPartTime,
      fullTime: currentUser.jobPreferences.isFullTime,
      contract: currentUser.jobPreferences.hasContract,
    });
  }, []);
  useEffect(() => {
    if (selectedCountry) {
      dispatch(getCities({ countryId: selectedCountry }));
    }
  }, [selectedCountry]);
  return (
    <div className="p-3">
      {platform === "android" || platform === "ios" ? null : <Divider />}

      <div
        className={`additional-box ${
          platform === "android" || platform === "ios" ? "pt-0" : "py-3"
        }`}
      >
        <Grid container spacing={2} item>
          <Grid
            item
            md={6}
            xs={platform === "android" || platform === "ios" ? "6" : "12"}
          >
            <FormControl fullWidth size="small">
              <label className="d-block mb-2">Country</label>
              <SelectInput
                placeholder="Country"
                defaultValue=""
                options={countries.map((country) => ({
                  value: country.id,
                  label: country.title,
                }))}
                onChange={(e) => setSelectedCountry(e.target.value)}
                value={selectedCountry}
              />
            </FormControl>
          </Grid>
          {selectedCountry.length > 0 && (
            <Grid
              item
              md={6}
              xs={platform === "android" || platform === "ios" ? "6" : "12"}
            >
              <FormControl fullWidth size="small">
                <label className="d-block mb-2">City</label>
                <SelectInput
                  placeholder={
                    selectedCountry ? "Choose City" : "Select Country first"
                  }
                  disabled={!selectedCountry}
                  options={(cities.data[selectedCountry] || []).map(
                    (country) => ({
                      value: country.id,
                      label: country.title,
                    })
                  )}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  value={selectedCity}
                />
              </FormControl>
            </Grid>
          )}
          <Grid item md={12} xs={12}>
            {platform === "android" || platform === "ios" ? null : (
              <Divider className="mb-3" />
            )}

            <label
              className="d-block"
              style={{
                marginBottom: "0.5rem",
                fontSize: "20px",
                "@media(max-width: 480px)": {
                  fontSize: "16px",
                },
              }}
            >
              Job type
            </label>
            <FormGroup
              row
              className={
                platform === "android" || platform === "ios"
                  ? null
                  : "additional-check"
              }
            >
              <FormControlReminder
                control={<CheckboxInput />}
                onChange={(e) =>
                  setJobType((prevState) => ({
                    ...prevState,
                    partTime: e.target.checked,
                  }))
                }
                checked={jobType.partTime}
                label="Part Time"
                sx={{
                  "&.MuiFormControlLabel-root": {
                    marginRight:
                      platform === "android" || platform === "ios"
                        ? "10px"
                        : "",
                  },
                  "&.MuiFormControlLabel-root .MuiFormControlLabel-label": {
                    fontSize:
                      platform === "android" || platform === "ios"
                        ? "12px"
                        : "",
                    fontWeight: jobType.partTime ? 500 : 400,
                  },
                }}
              />
              <FormControlReminder
                sx={{
                  "&.MuiFormControlLabel-root": {
                    marginRight:
                      platform === "android" || platform === "ios"
                        ? "10px"
                        : "",
                  },
                  "&.MuiFormControlLabel-root .MuiFormControlLabel-label": {
                    fontSize:
                      platform === "android" || platform === "ios"
                        ? "12px"
                        : "",
                    fontWeight: jobType.fullTime ? 500 : 400,
                  },
                }}
                control={<CheckboxInput />}
                onChange={(e) =>
                  setJobType((prevState) => ({
                    ...prevState,
                    fullTime: e.target.checked,
                  }))
                }
                checked={jobType.fullTime}
                label="Full Time"
              />
              <FormControlReminder
                sx={{
                  color: jobType.contract ? "addition-color" : "",
                  "&.MuiFormControlLabel-root": {
                    marginRight:
                      platform === "android" || platform === "ios"
                        ? "10px"
                        : "",
                  },
                  "&.MuiFormControlLabel-root .MuiFormControlLabel-label": {
                    fontSize:
                      platform === "android" || platform === "ios"
                        ? "12px"
                        : "",
                    fontWeight: jobType.fullTime ? 500 : 400,
                  },
                }}
                control={<CheckboxInput />}
                onChange={(e) =>
                  setJobType((prevState) => ({
                    ...prevState,
                    contract: e.target.checked,
                  }))
                }
                checked={jobType.contract}
                label="Consultant"
              />
            </FormGroup>
            {platform === "android" || platform === "ios" ? (
              ""
            ) : (
              <Divider className="my-3" />
            )}
          </Grid>
        </Grid>
      </div>
      <div
        className={
          platform === "android" || platform === "ios" ? "mt-4" : "text-center"
        }
      >
        <OutlinedButton
          title={
            <>
              <span className="me-2 d-inline-flex">
                <SVG.CheckIcon />
              </span>
              {platform === "android" || platform === "ios" ? "Next" : " Done"}
            </>
          }
          // component={Link}
          // to={`/${USER_ROLES.jobSeeker}/my-profile/update-profile`}
          onClick={handleSaveAdditionalParameters}
          sx={{
            "&.MuiButton-outlined": {
              border: "1px solid #EEA23D !important",
              color: "#EEA23D !important",
              fontWeight: "500",
              fontSize: "16px",
              padding: "10px 30px",
              width:
                platform === "android" || platform === "ios" ? "100%" : "134px",
              height: "42px",
              "@media(max-width: 992px)": {
                width:
                  platform === "android" || platform === "ios"
                    ? "100%"
                    : "129px",
                height: "42px",
              },
              "@media(max-width: 480px)": {
                width:
                  platform === "android" || platform === "ios"
                    ? "100%"
                    : "129px",
                height: "42px",
                fontSize: "14px",
              },

              "&:hover": {
                background: "rgba(255, 165, 0, 0.1)",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdditionalParameter;
