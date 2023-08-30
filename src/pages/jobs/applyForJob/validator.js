import * as Yup from "yup";

export const applyJobValidationSchema = Yup.object().shape({
  shortLetter: Yup.string().required("Please enter short-letter"),
  attachments: Yup.array().test("attachments", "Please add attachment", (value) => value.length > 0),
});
