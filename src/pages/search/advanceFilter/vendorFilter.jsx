import { ErrorMessage } from "../../../components/caption";
import { LabeledInput, SelectInput } from "../../../components/input";
import { FormControl, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./advanceFilter.module.css";
import { getTenderSector } from "../../../redux/slice/choices";
import { getCountries } from "@api/countries";
import { getCities } from "@api/cities";

function VendorFilter({ formik, footer, responsive }) {
  const [isSubmmited, setSubmmited] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();
  const {
    choices: {
      // tenderCategories,
      tags,
      opportunityTypes,
      sectors,
    },
    search: { totalItems },
  } = useSelector((state) => state);

  const getCountriesList = async () =>
    await getCountries().then((res) => setCountries(res));

  const getCitiesList = async (country) =>
    await getCities(country).then((res) => setCities(res));

  useEffect(() => getCountriesList(), []);
  useEffect(() => {
    if (formik.values.country) {
      getCitiesList(formik.values.country);
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
          {/* <Grid item xs={12} lg={responsive ? 12 : 4}>
            <div>
              <FormControl sx={{ m: 1 }} className="filter_input">
                <SelectInput
                  multiple
                  title="Category"
                  placeholder="Select Category"
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
          </Grid> */}
          <Grid item xs={12} lg={responsive ? 12 : 4}>
            <div>
              <FormControl sx={{ m: 1 }} className="filter_input">
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
          <Grid item xs={12} lg={responsive ? 12 : 4}>
            <div>
              <FormControl sx={{ m: 1 }} className="filter_input">
                <SelectInput
                  multiple
                  title="Type"
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
          <Grid item xs={12} lg={responsive ? 12 : 4}>
            <div>
              <FormControl sx={{ m: 1 }} className="filter_input">
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
          <Grid item xs={12} lg={responsive ? 12 : 4}>
            <div>
              <FormControl sx={{ m: 1 }} className="filter_input">
                <SelectInput
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
            <Grid item xs={12} lg={responsive ? 12 : 4}>
              <div>
                <FormControl sx={{ m: 1 }} className="filter_input">
                  <SelectInput
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
          <Grid item xs={12} lg={responsive ? 12 : 4}>
            <LabeledInput
              title="Years in market"
              className="add-form-control"
              placeholder="Numbers of years"
              {...formik.getFieldProps("yearsInMarket")}
            />

            {formik.touched.yearsInMarket && formik.errors.yearsInMarket ? (
              <ErrorMessage>{formik.errors.yearsInMarket}</ErrorMessage>
            ) : null}
          </Grid>
        </Grid>
      </div>
      <div className={`${styles.historySearch}`}>
        {isSubmmited && (
          <h5>
            <b>{totalItems}</b> Vendors found
          </h5>
        )}

        <div className={`${styles.savesearch}`}>{footer}</div>
      </div>
    </form>
  );
}

export default VendorFilter;
