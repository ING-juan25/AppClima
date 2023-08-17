import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Weather from "./components/Weather";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [countryName, setCountryName] = useState(null);
  const [latValue, setLatValue] = useState(null);
  const [lonValue, setLonValue] = useState(null);

  // To get the country name

  function fetchLocationName(lat, lon) {
    const API_KEY2 = "y77Y8tt+EY3w7Enay/FQPw==l0kTeMZ6MIOF5B1i";
    const url2 = `https://api.api-ninjas.com/v1/reversegeocoding?lat=${lat}&lon=${lon}`;
    console.log(url2);
    let options = {
      method: "GET",
      headers: { "x-api-key": `${API_KEY2}` },
    };

    fetch(url2, options)
      .then((res) => res.json())
      .then((data2) => {
        setLocationName(data2);
        setCountryCode(data2[0]?.country);
        setCityName(data2[0]?.name);
        setCountryName(Countries(countryCode));
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }

  // To get a list of country codes

  function fetchCountries() {
    fetch("/countries.json")
      .then((response) => response.json())
      .then((data) => {
        setCountriesList(data);
      })
      .catch((error) => console.log(error));
  }

  // Find the country by its code searching the array

  function Countries(countryCode) {
    fetchCountries();
    let countryName = "";
    for (let index = 0; index <= countriesList.length - 1; index++) {
      if (countryCode === countriesList[index].code) {
        countryName = countriesList[index].name;
        localStorage.setItem("countryName", countryName);
      }
    }
    return countryName;
  }

  // The calling to axios to get the weather information

  const success = (pos) => {
    const lat = pos?.coords.latitude;
    const lon = pos?.coords.longitude;

    const API_KEY = "9f60c42e872fbc81c72fba4d7ec7c3c4";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    axios
      .get(url)
      .then(({ data }) => setWeatherInfo(data))
      .catch((err) => console.log(err));

    setLatValue(lat);
    setLonValue(lon);
    fetchLocationName(lat, lon);
  };

  // Get the geolocation from the navigator

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <main
      className="mobile min-h-screen font-lato text-white flex justify-center
        items-center px-4
        bg-no-repeat bg-contain sm:bg-[url('/images/bg_wide1.svg')] sm:bg-cover"
    >
      <span className="grid grid-rows-[15%, 85%]">
        <span className="grid grid-cols-2"></span>
        <h2>
          <Weather weatherInfo={weatherInfo} cityName={cityName} />
        </h2>
      </span>
    </main>
  );
}

export default App;
