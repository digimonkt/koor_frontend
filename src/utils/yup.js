import * as Yup from "yup";
// !! TODO:
/**
 * @desc: This function will check weather a field is present or not
 * @example: If list = ["email", "mobileNumber"] then either of the two field must be present
 */
Yup.addMethod(Yup.object, "atLeastOneFieldExist", function (list, message) {});

export default Yup;
