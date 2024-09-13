import React from 'react'
import { useState } from 'react'
import Along_The_Day_Temp from './Along-The-Day-Temp'

export default function Today({data}) {
  // console.log("from today", data);
    const [todayDate, setDayDate] = useState(new Date(data.current.last_updated));
    const [tempEveryHour, setTempEveryHour] = useState(data.forecast.forecastday[0].hour);
  return (
    <div className='days-dis d-flex flex-column align-items-center justify-content-around p-3'>
        <h3 className='mb-3'>{todayDate.toDateString()}</h3>
        <h2 className='my-2'>{data.location.country}</h2>
        <img src={data.current.condition.icon} alt=""  className='my-2'/>
        <h3>{data.current.condition.text}</h3>
        <h3>{data.current.temp_c}°C</h3>
        <p className='my-2 fs-4'>Humidity: {data.current.humidity}%</p>
        <p className='my-2 fs-4'>Wind: {data.current.wind_kph} km/h</p>
        <Along_The_Day_Temp hours = {tempEveryHour}/>
    </div>
  )
}
