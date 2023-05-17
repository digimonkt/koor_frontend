import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LabeledInput, LabeledRadioInput } from "@components/input";
import { getLanguages } from "@redux/slice/choices";
import { LANGUAGE_PROFICIENCY } from "@utils/enum";
import { useFormik } from "formik";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { validateEditLanguage } from "../validator";
import { ErrorMessage } from "@components/caption";
import Loader from "@components/loader";
import {
  addLanguageDetailsAPI,
  updateLanguageDetailsAPI,
} from "@api/jobSeeker";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { addLanguageRecord, updateLanguageRecord } from "@redux/slice/user";
import styles from "./styles.module.css";

const color = "#EEA23D";
const buttonHover = "#eea23d14";
function EditLanguages({
  currentSelected,
  handleSubmit,
  handleClose,
  ...rest
}) {
  const dispatch = useDispatch();
  const { languages } = useSelector((state) => state.choices);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const formik = useFormik({
    initialValues: {
      language: "",
      spoken: "",
      written: "",
    },
    validationSchema: validateEditLanguage,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        language: values.language.id,
        spoken: values.spoken,
        written: values.written,
      };
      if (!currentSelected) {
        const res = await addLanguageDetailsAPI(payload);
        if (res.remote === "success") {
          dispatch(setSuccessToast("Language Added Successfully"));
          dispatch(
            addLanguageRecord({
              id: res.data.data.id,
              language: languages.data.find(
                (language) => language.id === res.data.data.language
              ),
              written: res.data.data.written,
              spoken: res.data.data.spoken,
            })
          );
        } else {
          dispatch(setErrorToast("Something went wrong"));
        }
        handleSubmit();
      } else {
        const res = await updateLanguageDetailsAPI({
          ...payload,
          id: currentSelected.id,
        });
        if (res.remote === "success") {
          dispatch(setSuccessToast("Language Updated Successfully"));
          dispatch(
            updateLanguageRecord({
              ...values,
              id: currentSelected.id,
            })
          );
        } else {
          dispatch(setErrorToast("Something went wrong"));
        }
        handleSubmit();
      }
      setLoading(false);
    },
  });
  useEffect(() => {
    if (!languages.length) {
      dispatch(getLanguages());
    }
  }, []);
  useEffect(() => {
    if (currentSelected) {
      const payload = {
        language: currentSelected.language,
        written: currentSelected.written,
        spoken: currentSelected.spoken,
      };
      for (const key in payload) {
        formik.setFieldValue(key, payload[key]);
      }
      setSearchValue(currentSelected.language.title);
    }
  }, [currentSelected]);
  return (
    <div>
      <div className="heading-div">
        <h1 className="heading">Language</h1>
        <SVG.CrossCircle className="cross-circle" onClick={handleClose} />
      </div>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3 search-language">
            <LabeledInput
              icon={<SVG.HeaderSearch />}
              placeholder="Search Language"
              labelWeight={500}
              style={{
                border: "1px solid #cacaca",
                borderRadius: "30px",
                padding: "8px 20px",
              }}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            {searchValue && searchValue !== formik.values.language.title && (
              <div className={styles.search_results_box}>
                {languages.data
                  .filter((lang) =>
                    lang.title.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((lang) => {
                    return (
                      <div
                        key={lang.id}
                        className={styles.search_results}
                        onClick={() => {
                          formik.setFieldValue("language", lang);
                          setSearchValue(lang.title);
                        }}
                      >
                        {lang.title}
                      </div>
                    );
                  })}
              </div>
            )}
            {formik.touched.language && formik.errors.language ? (
              <ErrorMessage>{formik.errors.language}</ErrorMessage>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <LabeledRadioInput
              title="Spoken"
              labelWeight="500"
              options={[
                {
                  label: "Fluent",
                  value: LANGUAGE_PROFICIENCY.fluent,
                },
                {
                  label: "Conversational",
                  value: LANGUAGE_PROFICIENCY.conversational,
                },
                {
                  label: "Basic",
                  value: LANGUAGE_PROFICIENCY.basic,
                },
              ]}
              {...formik.getFieldProps("spoken")}
              value={formik.values.spoken}
            />
            {formik.touched.spoken && formik.errors.spoken ? (
              <ErrorMessage>{formik.errors.spoken}</ErrorMessage>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <LabeledRadioInput
              title="Written"
              labelWeight="500"
              options={[
                {
                  label: "Fluent",
                  value: LANGUAGE_PROFICIENCY.fluent,
                },
                {
                  label: "Conversational",
                  value: LANGUAGE_PROFICIENCY.conversational,
                },
                {
                  label: "Basic",
                  value: LANGUAGE_PROFICIENCY.basic,
                },
              ]}
              {...formik.getFieldProps("written")}
            />
            {formik.touched.written && formik.errors.written ? (
              <ErrorMessage>{formik.errors.written}</ErrorMessage>
            ) : null}
          </div>
          <div className="text-center mt-3">
            <OutlinedButton
              title={
                loading ? (
                  <Loader loading={loading} style={{ color: "#EEA23D" }} />
                ) : (
                  <>
                    <span className="me-3 d-inline-flex">
                      <SVG.SaveFile />
                    </span>{" "}
                    {currentSelected ? "Update Language" : "Save Language"}
                  </>
                )
              }
              sx={{
                "&.MuiButtonBase-root": {
                  border: `1px solid ${color} !important`,
                  color: `${color} !important`,
                  "&:hover": { background: buttonHover },
                },
              }}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditLanguages;
