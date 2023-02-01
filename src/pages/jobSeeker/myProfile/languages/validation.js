import * as Yup from "yup";

export const languageValidationSchema = Yup.object().shape({
  language: Yup.string().required("Language is required!"),
  spoken: Yup.string().required("Spoken is required!"),
  written: Yup.string().required("Written is required!"),
});
