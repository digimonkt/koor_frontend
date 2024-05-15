import axios from "axios";

export const getCities = async (country) => {
  const response = await axios({
    method: "GET",
    url:
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&refine=cou_name_en%3A%22" +
      country +
      "%22",
  })
    .then((res) =>
      res.data.results
        .map((city) => city.name)
        .sort((a, b) => a.localeCompare(b))
    )
    .catch((err) => err);

  return response;
};
