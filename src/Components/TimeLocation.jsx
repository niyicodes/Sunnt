import React from 'react'
import { formatToLocalTime } from '../Services/weatherService'

const TimeLocation = ({weather:{dt, timezone, name, country}}) => {
  return (
    <div>
     <div className="flex items-center justify-center my-6">
      <p className="text-white text-xl font-extralight">{formatToLocalTime(dt, timezone)}</p>
     </div>
     <div className="flex items-center justify-center">
      <p className="text-white text-3xl font">{`${name}, ${country}`}</p>
     </div>
    </div>
  )
}

export default TimeLocation