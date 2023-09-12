import * as Yup from "yup";

export const applyJobValidationSchema = Yup.object().shape({
  shortLetter: Yup.string()
    .required("Please enter short-letter")
    // .trim() // Trim leading and trailing white spaces,
    .matches(/^\s*\S+(\s+\S+)*\s*$/, "Short letter cannot contain only white spaces"), // Custom rule to disallow only white spaces
  attachments: Yup.array().test("attachments", "Please add attachment", (value) => value.length > 0),
});
