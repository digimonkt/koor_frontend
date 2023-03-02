import * as Yup from "yup";

export const applyJobValidationSchema = Yup.object().shape({
  shortLetter: Yup.string(),
  attachments: Yup.array(),
});
