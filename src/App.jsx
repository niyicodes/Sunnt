import React, { useEffect, useState } from "react";
import TopButtons from "./Components/TopButtons";
import "./App.css";
import Inputs from "./Components/Inputs";
import TimeLocation from "./Components/TimeLocation";
import WeatherDetails from "./Components/WeatherDetails";
import Forecast from "./Components/Forecast";
import getFormattedWeatherData from "./Services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
 const [query, setQuery] = useState({ q: "lagos" });
 const [units, setUnits] = useState("metric");
 const [weather, setWeather] = useState(null);

 useEffect(() => {
  const fetchWeather = async () => {
   const message = query.q ? query.q : "current location.";
   toast.info("Fetching weather for " + message);
   await getFormattedWeatherData({ ...query, units }).then((data) => {
    toast.success(
     `Successfully fetched weather for ${data.name},${data.country}.`
    );
    setWeather(data);
   });
  };
  fetchWeather();
 }, [query, units]);

 const formatBackground = () => {
  if (!weather) return "from-cyan-700 to-blue-700";
  const threshold = units === "metric ? 20 : 60";
  if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

  return "from-yellow-700 to-orange-700";
 };

 return (
  <div
   className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground}`}
  >
   <TopButtons setQuery={setQuery} />
   <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

   {weather && (
    <div>
     <TimeLocation weather={weather} />
     <WeatherDetails weather={weather} />
     <Forecast title={"HOURLY FORECAST"} items={weather.fiveDay} />
     <Forecast title={"DAILY FORECAST"} items={weather.fiveDay} />
    </div>
   )}
   <ToastContainer autoClose={2000} theme="colored" newestOnTop={true} />
  </div>
 );
}

export default App;
