import { Divider, FormControl, FormGroup, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { CheckboxInput, SelectInput } from "@components/input";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getCountries } from "@redux/slice/choices";
import { FormControlReminder } from "@components/style";
import { UpdateJobSeekerAdditionalParametersAPI } from "@api/jobSeeker";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "@utils/enum";

const AdditionalParameter = ({ handleChange, age, city, handleCity }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countries, cities } = useSelector((state) => state.choices);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [jobType, setJobType] = useState({
    partTime: false,
    fullTime: false,
    contract: false,
  });

  const handleSaveAdditionalParameters = async () => {
    const payload = {
      is_part_time: jobType.partTime,
      is_full_time: jobType.fullTime,
      has_contract: jobType.contract,
      country: selectedCountry,
      city: selectedCity,
    };
    const res = await UpdateJobSeekerAdditionalParametersAPI(payload);
    if (res.remote === "success") {
      navigate(`/${USER_ROLES.jobSeeker}/my-profile/update-profile`);
    }
  };
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
  }, []);
  useEffect(() => {
    if (selectedCountry) {
      dispatch(getCities({ countryId: selectedCountry }));
    }
  }, [selectedCountry]);
  return (
    <div className="p-3">
      <Divider />
      <div className="py-3 additional-box">
        <Grid container spacing={2} item>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <label className="d-block mb-2">Country</label>
              <SelectInput
                placeholder="Country"
                defaultValue=""
                options={countries.data.map((country) => ({
                  value: country.id,
                  label: country.title,
                }))}
                onChange={(e) => setSelectedCountry(e.target.value)}
                value={selectedCountry}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <label className="d-block mb-2">City</label>
              <SelectInput
                placeholder={selectedCountry ? "City" : "Select Country first"}
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
          <Grid item md={12} xs={12}>
            <Divider className="my-3" />
            <label className="d-block" style={{ marginBottom: "0.5rem" }}>
              Job type
            </label>
            <FormGroup row>
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
              />
              <FormControlReminder
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
                control={<CheckboxInput />}
                onChange={(e) =>
                  setJobType((prevState) => ({
                    ...prevState,
                    contract: e.target.checked,
                  }))
                }
                checked={jobType.contract}
                label="Contract"
              />
            </FormGroup>
            <Divider className="my-3" />
          </Grid>
        </Grid>
      </div>
      <div className="text-center">
        <OutlinedButton
          title={
            <>
              <span className="me-2 d-inline-flex">
                <SVG.CheckIcon />
              </span>{" "}
              Done
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
