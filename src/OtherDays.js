import React, { useState } from 'react'

export default function OtherDays({day, data}) {

    const [dayData, setDayDate] = useState(data[day - 1]);
    const [date, setDate] = useState(new Date(dayData.date))
    console.log(dayData);
    

    return (
        <div className='days-dis w-100 d-flex flex-column align-items-center mx-2 py-3'>
            <p className=' fs-4 w-100 text-center'><b>{date.toDateString()}</b></p>
            <div className="fs-4 text-center d-flex justify-content-around align-items-center w-75">
                <img src={dayData.day.condition.icon} alt="" />
                <h4>{dayData.day.condition.text}</h4>
            </div>
            <div className = "fs-4 d-flex flex-column justify-content-around align-items-center w-75">
                        <p>Max : {dayData.day.maxtemp_c}° C</p>
                        <p>Min : {dayData.day.mintemp_c}° C</p>
                        <p>Avg : {dayData.day.avgtemp_c}° C</p>
            </div>
        </div>
    )
}
