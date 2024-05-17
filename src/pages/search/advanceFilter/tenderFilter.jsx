import { ErrorMessage } from "../../../components/caption";
import { DateInput, SelectInput } from "../../../components/input";
import { FormControl, Grid, Stack } from "@mui/material";
// import { JobFormControl } from "@pages/jobs/postJobs/style";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./advanceFilter.module.css";
// import CurrencyInput from "@pages/jobs/postJobs/currencyInput";
import { getTenderSector } from "../../../redux/slice/choices";
import { getCountries } from "@api/countries";
import { getCities } from "@api/cities";

function TenderFilter({ formik, footer, responsive }) {
  const [isSubmmited, setSubmmited] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();
  const {
    choices: { tenderCategories, tags, opportunityTypes, sectors },
    search: { totalItems },
  } = useSelector((state) => state);

  const getCountriesList = async () =>
    await getCountries().then((res) => setCountries(res));

  const getCitiesList = async (country) =>
    await getCities(country).then((res) => setCities(res));

  useEffect(() => getCountriesList(), []);
  useEffect(() => {
    if (formik.values.country) {
      const countryName = countries.find(
        (x) => x.id === formik.values.country
      ).title;
      getCitiesList(countryName);
    }
  }, []);

  useEffect(() => {
    if (!sectors.data.length) {
      dispatch(getTenderSector());
    }
  }, []);
  return (
    <form
      onSubmit={(e) => {
        formik.handleSubmit(e);
        setSubmmited(true);
      }}
    >
      <div className="SelectDropdown">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  sx={{ "& .MuiSelect-select": { padding: "10px 15px" } }}
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
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  sx={{ "& .MuiSelect-select": { padding: "10px 15px" } }}
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
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  sx={{ "& .MuiSelect-select": { padding: "10px 15px" } }}
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
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  sx={{ "& .MuiSelect-select": { padding: "10px 15px" } }}
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
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  sx={{ "& .MuiSelect-select": { padding: "10px 15px" } }}
                  title="Country"
                  placeholder="Country"
                  defaultValue=""
                  options={countries.map((country) => ({
                    value: country.id,
                    label: country.title,
                  }))}
                  {...formik.getFieldProps("country")}
                />
              </FormControl>
            </div>
          </Grid>
          {formik.values.country && (
            <Grid item xs={12} sm={6} lg={responsive ? 12 : 4}>
              <div>
                <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                  <SelectInput
                    sx={{ "& .MuiSelect-select": { padding: "10px 15px" } }}
                    title="City"
                    placeholder="City"
                    disabled={!formik.values.country}
                    options={cities.map((city) => ({
                      value: city,
                      label: city,
                    }))}
                    {...formik.getFieldProps("city")}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <ErrorMessage>{formik.errors.city}</ErrorMessage>
                  ) : null}
                </FormControl>
              </div>
            </Grid>
          )}
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
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

          {/* <Grid item xs={4} lg={responsive ? 12 : 4}>
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
          <Grid item xs={4} lg={responsive ? 12 : 4} sx={{ marginTop: "7px" }}>
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
        {isSubmmited && (
          <h5>
            <b>{totalItems}</b> tenders found
          </h5>
        )}

        <div className={`${styles.savesearch}`}>{footer}</div>
      </div>
    </form>
  );
}

export default TenderFilter;
