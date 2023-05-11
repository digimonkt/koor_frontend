import { FormGroup, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FormControlReminder } from "@components/style";
import { CheckboxInput } from "@components/input";
import { OutlinedButton } from "@components/button";
import { SVG } from "@assets/svg";
import CurrencyInput from "@pages/jobs/postJobs/currencyInput";
import { useDispatch, useSelector } from "react-redux";
import { UpdateJobPreferencesAPI } from "@api/jobSeeker";
import { setSuccessToast } from "@redux/slice/toast";
import { updateCurrentUser } from "@redux/slice/user";
import { Link } from "react-router-dom";

const JobPreferences = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [jobPreferences, setJobPreferences] = useState({
    isAvailable: false,
    displayInSearch: false,
    isPartTime: false,
    isFullTime: false,
    hasContract: false,
    expectedSalary: 0,
  });

  const handleChangeCheckbox = (name) => (e) => {
    setJobPreferences({ ...jobPreferences, [name]: e.target.checked });
  };
  const handleChangeInput = (name) => (e) => {
    console.log("e: ", e.target.value, name);
    setJobPreferences({ ...jobPreferences, [name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      is_available: jobPreferences.isAvailable,
      display_in_search: jobPreferences.displayInSearch,
      is_part_time: jobPreferences.isPartTime,
      is_full_time: jobPreferences.isFullTime,
      has_contract: jobPreferences.hasContract,
      expected_salary: jobPreferences.expectedSalary,
    };
    const res = await UpdateJobPreferencesAPI(payload);
    if (res.remote === "success") {
      dispatch(setSuccessToast("Updated Preferences successfully"));
      dispatch(
        updateCurrentUser({
          jobPreferences: {
            isAvailable: !!payload.is_available,
            displayInSearch: !!payload.display_in_search,
            isPartTime: !!payload.is_part_time,
            isFullTime: !!payload.is_full_time,
            hasContract: !!payload.has_contract,
            expectedSalary: payload.expected_salary,
          },
        })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    setJobPreferences({
      isAvailable: currentUser.jobPreferences.isAvailable,
      displayInSearch: currentUser.jobPreferences.displayInSearch,
      isPartTime: currentUser.jobPreferences.isPartTime,
      isFullTime: currentUser.jobPreferences.isFullTime,
      hasContract: currentUser.jobPreferences.hasContract,
      expectedSalary: currentUser.jobPreferences.expectedSalary,
    });
  }, []);
  return (
    <>
      <div className="add-content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "15px",
          }}
        >
          <h2>Job preferences</h2>
          <Link to="/job_seeker/my-profile/job-criteria">
            <span>More</span>
          </Link>
        </div>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2, md: 2 }}
          alignItems={{ xs: "start", lg: "center" }}
        >
          <label className="w-25">Availability:</label>
          <div className="w-75">
            <FormGroup row>
              <FormControlReminder
                control={<CheckboxInput />}
                onChange={handleChangeCheckbox("isAvailable")}
                checked={jobPreferences.isAvailable}
                label="I’m available right now"
              />
            </FormGroup>
          </div>
        </Stack>
        <div className="job-text">
          This will automatically turned OFF every week. Remember to turn it ON
          to keep employer informed of your availability.
        </div>
        <Stack
          className="mb-3"
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2, md: 2 }}
          alignItems={{ xs: "start", lg: "center" }}
        >
          <label className="w-25">Search visibility:</label>
          <div className="w-75">
            <FormGroup row>
              <FormControlReminder
                control={<CheckboxInput />}
                onChange={handleChangeCheckbox("displayInSearch")}
                checked={jobPreferences.displayInSearch}
                label="Display my profile in Talents search"
              />
            </FormGroup>
          </div>
        </Stack>
        <Stack
          className="mb-3"
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2, md: 2 }}
          alignItems={{ xs: "start", lg: "center" }}
        >
          <label className="w-25">Job type:</label>
          <div className="w-75">
            <FormGroup row>
              <FormControlReminder
                control={<CheckboxInput />}
                onChange={handleChangeCheckbox("isPartTime")}
                checked={jobPreferences.isPartTime}
                label="Part Time"
              />
              <FormControlReminder
                control={<CheckboxInput />}
                onChange={handleChangeCheckbox("isFullTime")}
                checked={jobPreferences.isFullTime}
                label="Full Time"
              />
              <FormControlReminder
                control={<CheckboxInput />}
                onChange={handleChangeCheckbox("hasContract")}
                checked={jobPreferences.hasContract}
                label="Contract"
              />
            </FormGroup>
          </div>
        </Stack>

        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2, md: 2 }}
          alignItems={{ xs: "start", lg: "start" }}
          className="mt-3"
        >
          <label className="w-25">Expected salary:</label>
          <div className="w-55">
            <CurrencyInput
              optionsValues={{
                currency: { value: "usd" },
                input: {
                  value: Number(jobPreferences.expectedSalary || 0),
                  onChange: handleChangeInput("expectedSalary"),
                },
                payPeriod: {},
              }}
              errors={{
                currency: "",
                input: "",
                payPeriod: "",
              }}
            />
          </div>
        </Stack>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2, md: 2 }}
          alignItems={{ xs: "start", lg: "center" }}
          justifyContent="center"
          className="mt-3"
        >
          <div
            className="text-center"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <OutlinedButton
              disabled={loading}
              onClick={handleSubmit}
              title={
                <>
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      <span className="me-2 d-inline-flex">
                        <SVG.SaveIcon />
                      </span>
                      Update preferences
                    </>
                  )}
                </>
              }
            />
          </div>
        </Stack>
      </div>
    </>
  );
};
export default JobPreferences;
