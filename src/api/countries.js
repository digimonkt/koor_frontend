import axios from "axios";

export const getCountries = async () => {
  const response = await axios
    .get("https://restcountries.com/v3.1/all")
    .then((res) => {
      const data = res.data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      return data.map((data) => ({
        id: data.ccn3,
        title: data.name.common,
        currencyCode: Object.keys({ ...data.currencies })[0],
        countryCode: data.ccn3,
        iso2: data.cca2,
        iso3: data.cca3,
      }));
    })
    .catch((err) => ({
      error: err,
    }));
  return response;
};
