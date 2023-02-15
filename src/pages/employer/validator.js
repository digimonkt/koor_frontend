import * as Yup from "yup";

export const validateEmployerAboutMe = Yup.object().shape({
  organizationName: Yup.string(),
});
