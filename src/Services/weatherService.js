import { DateTime } from "luxon";


const API_KEY = "cea1307ba76523c9ca4be7729bed5acf";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
 const url = new URL(BASE_URL + "/" + infoType);
 url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

 return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
 const {
  coord: { lat, lon },
  main: { temp, feels_like, temp_min, temp_max, humidity },
  name,
  dt,
  sys: { country, sunrise, sunset },
  weather,
  wind: { speed },
 } = data;

 const { main: details, icon } = weather[0];

 return {
  lat,
  lon,
  temp,
  feels_like,
  temp_min,
  temp_max,
  humidity,
  country,
  sunrise,
  sunset,
  speed,
  name,
  dt,
  details,
  icon,
 };
};

// Get timezone

const formatToLocalTime = (
 secs,
 zone,
 format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

//
const formatForecastWeather = (data) => {
 let { timezone, fiveDay } = data;

 // daily = daily.slice(1, 6).map((d) => {
 //  return {
 //   title: formatToLocalTime(d.dt, timezone, "ccc"),
 //   temp: d.temp.day,
 //   icon: d.weather[0].icon,
 //  };
 // });
 // fiveDay = fiveDay.slice(0,5).map((d) => {
 //  return {
 //   title: formatToLocalTime(d.dt, timezone, "ccc"),
 //   temp: d.temp.day,
 //   icon: d.weather[0].icon,
 //  };
 // });
 // hourly = hourly.slice(1, 6).map((h) => {
 //  return {
 //   title: formatToLocalTime(h.dt, timezone, "ccc"),
 //   temp: h.temp,
 //   icon: h.weather[0].icon,
 //  };
 // });

 return { timezone, fiveDay };
};

const getFormattedWeatherData = async (searchParams) => {
 const formattedCurrentWeather = await getWeatherData(
  "weather",
  searchParams
 ).then(formatCurrentWeather);

 const { lat, lon } = formattedCurrentWeather;

 const formattedForecastWeather = await getWeatherData("forecast", {
  lat,
  lon,
  exclude: "current,minutely,alerts",
  units: searchParams.units,
 }).then(formatForecastWeather); //formatForecastWeather

 return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const iconUrlFromCode = (code) =>`http://openweathermap.org/img/wn/${code}@2x.png`;

export {formatToLocalTime, iconUrlFromCode}

export default getFormattedWeatherData;
