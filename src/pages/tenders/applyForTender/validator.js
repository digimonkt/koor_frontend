import * as Yup from "yup";

export const applyTenderValidationSchema = Yup.object().shape({
  shortLetter: Yup.string(),
  attachments: Yup.array(),
});
