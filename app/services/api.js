const ApiClient = (baseUrl) => ({
  async get(endpoint) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);
      if (!response.ok) {
        return [null, `HTTP error: ${response.status}`];
      }
      const data = await response.json();
      return [data, null];
    } catch (error) {
      return [null, error.message];
    }
  },
});

const api = ApiClient("https://restcountries.com/v3.1");
//const weatherApiClient = ApiClient("https://api.openweathermap.org/data/2.5");

const countriesApi = {
  getAll: () =>
    api.get("/all?fields=cca3,name,capital,region,population,flags"),
};

/*
const weatherApi = {
  getByCountryCode: (countryCode) =>
    weatherApiClient.get(`/weather?q=${countryCode}`),
};
*/
//export {countriesApi, weatherApi};
export {countriesApi};
