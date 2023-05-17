import React, { useEffect, useState } from "react";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";

import styles from "./styles.module.css";
function PhoneNumberInputComponent({
  className,
  onChange,
  isInvalidNumber,
  defaultCountry,
  ...rest
}) {
  const { currentLocation } = useSelector((state) => state.auth);
  const [country, setCountry] = useState("");
  useEffect(() => {
    if (!country) {
      setCountry(currentLocation.countryCode);
    } else {
      setCountry(defaultCountry);
    }
  }, [defaultCountry, currentLocation]);
  useEffect(() => {
    if (isInvalidNumber) {
      isInvalidNumber(isValidPhoneNumber(rest.value || ""));
    }
  }, [rest.value]);
  return (
    <>
      <PhoneInput
        placeholder="Mobile Number"
        {...rest}
        defaultCountry={country}
        className={`${styles.phone_number} ${className || ""}`}
        onChange={(e) =>
          onChange({
            national: formatPhoneNumber(e),
            international: formatPhoneNumberIntl(e),
            value: e || "",
          })
        }
      />
    </>
  );
}

export default PhoneNumberInputComponent;
