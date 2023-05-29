import { ErrorMessage } from "@components/caption";
import { DateInput, SelectInput } from "@components/input";
import { FormControl, Grid, Stack } from "@mui/material";
// import { JobFormControl } from "@pages/jobs/postJobs/style";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./advanceFilter.module.css";
// import CurrencyInput from "@pages/jobs/postJobs/currencyInput";
import { getTenderSector } from "@redux/slice/choices";

function TenderFilter({ formik, footer }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!sectors.data.length) {
      dispatch(getTenderSector());
    }
  }, []);
  const {
    choices: {
      countries,
      cities,
      tenderCategories,
      tags,
      opportunityTypes,
      sectors,
    },
    search: { totalItems },
  } = useSelector((state) => state);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="SelectDropdown">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  multiple
                  title="Category"
                  placeholder="Select a Tender category"
                  options={(tenderCategories.data || []).map((jobCategory) => ({
                    value: jobCategory.id,
                    label: jobCategory.title,
                  }))}
                  name={"tenderCategories"}
                  value={formik.values.tenderCategories}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.jobCategories && formik.errors.jobCategories ? (
                  <ErrorMessage>{formik.errors.jobCategories}</ErrorMessage>
                ) : null}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  multiple
                  title="Sector"
                  defaultValue=""
                  placeholder="Select Sector"
                  options={sectors.data.map((sector) => ({
                    value: sector.id,
                    label: sector.title,
                  }))}
                  name={"sector"}
                  value={formik.values.sector}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.sector && formik.errors.sector ? (
                  <ErrorMessage>{formik.errors.sector}</ErrorMessage>
                ) : null}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  multiple
                  title="Opportunity Type"
                  defaultValue=""
                  placeholder="Opportunity Type"
                  options={(opportunityTypes.data || []).map(
                    (opportunityType) => ({
                      value: opportunityType.id,
                      label: opportunityType.title,
                    })
                  )}
                  name={"opportunityType"}
                  value={formik.values.opportunityType}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.opportunityType &&
                formik.errors.opportunityType ? (
                  <ErrorMessage>{formik.errors.opportunityType}</ErrorMessage>
                ) : null}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  multiple
                  title="Tag"
                  defaultValue=""
                  placeholder="Select Tag"
                  options={(tags.data || []).map((tag) => ({
                    value: tag.id,
                    label: tag.title,
                  }))}
                  name={"tag"}
                  value={formik.values.tag}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.tag && formik.errors.tag ? (
                  <ErrorMessage>{formik.errors.tag}</ErrorMessage>
                ) : null}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  title="Country"
                  placeholder="Country"
                  defaultValue=""
                  options={countries.data.map((country) => ({
                    value: country.id,
                    label: country.title,
                  }))}
                  {...formik.getFieldProps("country")}
                />
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  title="City"
                  placeholder={
                    formik.values.country ? "City" : "Select Country first"
                  }
                  disabled={!formik.values.country}
                  options={(cities.data[formik.values.country] || []).map(
                    (country) => ({
                      value: country.title,
                      label: country.title,
                    })
                  )}
                  {...formik.getFieldProps("city")}
                />
                {formik.touched.city && formik.errors.city ? (
                  <ErrorMessage>{formik.errors.city}</ErrorMessage>
                ) : null}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="filter_input"
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className="mb-2"
              >
                <label className="mb-1 d-inline-block">Deadline</label>
              </Stack>
              <DateInput
                onChange={(e) => formik.setFieldValue("deadline", e)}
                value={formik.values.deadline}
                onBlur={formik.getFieldProps("deadline").onBlur}
              />
              {formik.touched.deadline && formik.errors.deadline ? (
                <ErrorMessage>{formik.errors.deadline}</ErrorMessage>
              ) : null}
            </div>
          </Grid>

          {/* <Grid item xs={4} lg={3}>
            <CurrencyInput
              currency="USD"
              title="Budget"
              optionsValues={{
                currency: "USD",
                input: formik.getFieldProps("budgetMin"),
              }}
              errors={{
                currency: "USD",
                input: formik.touched.budgetMin ? formik.errors.budgetMin : "",
              }}
            />
          </Grid>
          <Grid item xs={4} sx={{ marginTop: "7px" }}>
            <FormGroup row sx={{ marginLeft: "7px" }}>
              <LabeledInput
                placeholder="To"
                {...formik.getFieldProps("budgetMax")}
              />
            </FormGroup>
          </Grid> */}
        </Grid>
      </div>
      <div className={`${styles.historySearch}`}>
        <h5>
          <b>{totalItems}</b> tenders found
        </h5>
        <div className={`${styles.savesearch}`}>{footer}</div>
      </div>
    </form>
  );
}

export default TenderFilter;
