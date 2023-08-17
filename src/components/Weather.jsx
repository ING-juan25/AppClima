import { useState, useEffect } from "react";
import "./styles/Weather.css";

const Weather = ({ weatherInfo, cityName }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const countryName = localStorage.getItem("countryName");
  const [butStr1, setbutStr1] = useState(darkMode ? "▫🟢" : "🔴▫");

  console.log(weatherInfo);
  const kelvin = Math.floor(weatherInfo?.main.temp);
  const celsius = (kelvin - 273.15).toFixed(1);
  const fahren = ((celsius * 9) / 5 + 32).toFixed(1);

  useEffect(() => {
    function changeWeatherconditionicon(description) {
      const weatherConditions = [
        {
          condition: "clear sky",
          icon: "https://openweathermap.org/img/wn/01d@2x.png",
          icondark: "https://openweathermap.org/img/wn/01n@2x.png",
        },
        {
          condition: "few clouds",
          icon: "https://openweathermap.org/img/wn/02d@2x.png",
          icondark: "https://openweathermap.org/img/wn/02n@2x.png",
        },
        {
          condition: "scattered clouds",
          icon: "https://openweathermap.org/img/wn/03d@2x.png",
          icondark: "https://openweathermap.org/img/wn/03n@2x.png",
        },
        {
          condition: "broken clouds",
          icon: "https://openweathermap.org/img/wn/04d@2x.png",
          icondark: "https://openweathermap.org/img/wn/04n@2x.png",
        },
        {
          condition: "shower rain",
          icon: "https://openweathermap.org/img/wn/09d@2x.png",
          icondark: "https://openweathermap.org/img/wn/09n@2x.png",
        },
        {
          condition: "rain",
          icon: "https://openweathermap.org/img/wn/10d@2x.png",
          icondark: "https://openweathermap.org/img/wn/10n@2x.png",
        },
        {
          condition: "light rain",
          icon: "https://openweathermap.org/img/wn/10d@2x.png",
          icondark: "https://openweathermap.org/img/wn/10n@2x.png",
        },
        {
          condition: "thunderstorm",
          icon: "https://openweathermap.org/img/wn/11d@2x.png",
          icondark: "https://openweathermap.org/img/wn/11n@2x.png",
        },
        {
          condition: "snow",
          icon: "https://openweathermap.org/img/wn/13d@2x.png",
          icondark: "https://openweathermap.org/img/wn/13n@2x.png",
        },
        {
          condition: "mist",
          icon: "https://openweathermap.org/img/wn/50d@2x.png",
          icondark: "https://openweathermap.org/img/wn/50n@2x.png",
        },
      ];
      for (let index = 0; index < weatherConditions.length; index++) {
        if (description === weatherConditions[index].condition && darkMode) {
          setWeatherCondition(weatherConditions[index].icondark);
        }
        if (description === weatherConditions[index].condition && !darkMode) {
          setWeatherCondition(weatherConditions[index].icon);
        }
      }
    }
    changeWeatherconditionicon(weatherInfo?.weather[0].description);
  }, [weatherInfo?.weather[0].description]);

  let changeTempButtonLabel = isCelsius ? "Cambiar a °F" : "Cambiar a °C";
  const handleChangeTemp = () => {
    setIsCelsius(!isCelsius);
  };

  const tempScale = (isCelsius, celsius, fahren) => {
    let scale = "";
    if (isCelsius) {
      scale = celsius.toString() + " °C";
    } else {
      scale = fahren.toString() + " °F";
    }
    return scale;
  };

  let newTemp = tempScale(isCelsius, celsius, fahren);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    setbutStr1(darkMode ? "°🟢" : "🔴°");
  };

  return (
    <section className="text-center">
      <section className="grid grid-cols-[45%,7%,48%] w-25 mb-5">
        <h1 className="text-transparent">
          Lorem ipsum dolor sit amet consectetur
        </h1>
        <button
          onClick={handleDarkMode}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text-left font-bold py-1 px-1 rounded-full"
        >
          {butStr1}
        </button>
        <h1 className="text-transparent">
          Lorem ipsum dolor sit amet consectetur
        </h1>
      </section>
      <h2
        className={`text-2xl rounded-lg border-4 border-[#bac4c8] ${
          !darkMode ? "drkmod" : ""
        }`}
      >
        {cityName}, {countryName}
      </h2>
      <br></br>
      <section className="grid grid-gap-x-8 sm:grid-cols-[65%,35%] sm:gap-y-8 text-slate-500">
        {/* sección superior */}
        <section
          className={`p-2 mb-4 rounded-2xl grid grid-cols-2 items-center w-[95%]
         ${!darkMode ? "drkmod bg-black/60" : "bg-white/60"}`}
        >
          <h4 className="col-span-2 h-10">
            {weatherInfo?.weather[0].description}
          </h4>
          <span className="text-4xl">
            <p>{newTemp}</p>
          </span>
          <div>
            <img
              className="backdrop-contrast-50"
              src={weatherCondition}
              alt=""
            />
          </div>
        </section>
        {/* sección inferior */}
        <section
          className={`p-2 mb-4 rounded-2xl grid grid-cols-3
         sm:grid-cols-1 sm:ml-4 text-slate-500 w-[95%] ${
           !darkMode ? "drkmod bg-black/60" : "bg-white/60"
         } `}
        >
          <article className="grid grid-cols-2 justify-items-center items-center">
            <div className="w-[18px]">
              <img src="/images/wind.png" alt="wind" />
            </div>
            <span>{weatherInfo?.wind.speed} m/s</span>
          </article>

          <article className="grid grid-cols-2 justify-items-center items-center">
            <div className="w-[18px]">
              <img src="/images/humidity.png" alt="humidity" />
            </div>
            <span>{weatherInfo?.main.humidity} %</span>
          </article>

          <article className="grid grid-cols-2 justify-items-center items-center">
            <div className="w-[18px]">
              <img src="/images/pressure.png" alt="pressure" />
            </div>
            <span>{weatherInfo?.main.pressure} hPa</span>
          </article>
        </section>
      </section>
      <button
        onClick={handleChangeTemp}
        className={`mt-4 bg-blue-500 hover:bg-blue-700
          font-bold py-2 px-4 rounded-full ${
            !darkMode ? "drkmod bg-black/60 text-white" : "text-[#333]"
          }`}
      >
        {changeTempButtonLabel}
      </button>
    </section>
  );
};

export default Weather;
