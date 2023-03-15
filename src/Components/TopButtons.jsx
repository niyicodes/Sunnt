import React from "react";

const TopButtons = ({setQuery}) => {
 const cities = [
  {
   id: 1,
   title: "London",
  },
  {
   id: 2,
   title: "Sydney",
  },
  {
   id: 4,
   title: "Tokyo",
  },
  {
   id: 5,
   title: "Toronto",
  },
  {
   id: 6,
   title: "Paris",
  },
 ]
 return (
  <div className="flex items-center justify-around my-6">
   {
    cities.map((city,index) => {
     return(
      <button key={index} className="text-white text-lg font-medium" onClick={() => setQuery({q: city.title})}>{city.title}</button>
     )
    })
   }
  </div>
 );
};

export default TopButtons;
