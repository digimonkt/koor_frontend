import React, { useEffect } from "react";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "./styles.module.css";
function PhoneNumberInputComponent({
  className,
  onChange,
  isInvalidNumber,
  ...rest
}) {
  useEffect(() => {
    if (isInvalidNumber) {
      isInvalidNumber(isValidPhoneNumber(rest.value));
    }
  }, [rest.value]);
  return (
    <PhoneInput
      placeholder="Mobile Number"
      {...rest}
      className={`${styles.phone_number} ${className || ""}`}
      onChange={(e) =>
        onChange({
          national: formatPhoneNumber(e),
          international: formatPhoneNumberIntl(e),
          value: e,
        })
      }
    />
  );
}

export default PhoneNumberInputComponent;
