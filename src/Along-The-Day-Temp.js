import React from 'react'
function EachHour({temp, time}){
    return <div className='text-center mx-5 my-3 fs-5'>
        <p>{time}</p>
        <p><b>{temp}°C</b></p>
    </div>
}
export default function Along_The_Day_Temp({hours}) {
  return (
    <div className=' d-flex justify-content-evenly my-3 w-100 flex-wrap'>
      {hours.map( (hour, index) => {
        if((index) % 2 === 0){
          const dayHour = new Date(hour.time);
          return <EachHour key={index} temp={hour.temp_c} time={`${dayHour.getHours().toString().padStart(2,"0")} : ${dayHour.getMinutes().toString().padStart(2,"0")}`}/>
        }
      })}
    </div>
  )
}
