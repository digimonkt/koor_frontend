export const transformGetCountriesAPIResponse = (data) => {
  return data.map((data) => ({
    id: data.id,
    title: data.title,
    currencyCode: data.currency_code,
    countryCode: data.country_code,
    iso2: data.iso_code2,
    iso3: data.iso_code3,
  }));
};
