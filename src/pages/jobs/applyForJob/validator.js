import * as Yup from "yup";

export const applyJobValidationSchema = Yup.object().shape({
  shortLetter: Yup.string().required("short letter is required!"),
  attachments: Yup.array()
    .min(1, "You can't leave this blank.")
    .required("You can't leave this blank.")
    .nullable(),
});
