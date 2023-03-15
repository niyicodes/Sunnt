import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

const Inputs = ({ setQuery, units, setUnits }) => {
 const [city, setCity] = useState("");

 const handleSearch = () => {
  if (city !== "") {
   setQuery({ q: city });
  }
 };

 const handleLocating = () => {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    setQuery({
     lat,
     lon,
    });
   });
  }
 };

 const handleUnitChange = (e) => {
  const selected = e.target.name;

  if (units !== selected) {
   setUnits(selected);
  }
 };

 return (
  <div className="flex flex-row justify-center my-6">
   <div className="flex flex-row w-3/4 items-center justify-center space-x-6">
    <input
     type="text"
     placeholder="Search for city..."
     id=""
     className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
     value={city}
     onChange={(e) => setCity(e.currentTarget.value)}
    />
    <UilSearch
     size={25}
     className="text-white cursor-pointer transition ease-out hover:scale-125"
     onClick={handleSearch}
    />
    <UilLocationPoint
     size={25}
     className="text-white cursor-pointer transition ease-out hover:scale-125"
     onClick={handleLocating}
    />
   </div>
   <div className="flex flex-row w-1/4 items-center justify-center">
    <button
     className="text-xl text-white font-light  cursor-pointer transition ease-out hover:scale-125"
     onClick={handleUnitChange}
     name="metric"
    >
     °C
    </button>
    <p className="text-xl text-white mx-1">|</p>
    <button
     className="text-xl text-white font-light  cursor-pointer transition ease-out hover:scale-125"
     onClick={handleUnitChange}
     name="imperial"
    >
     °F
    </button>
   </div>
  </div>
 );
};

export default Inputs;
