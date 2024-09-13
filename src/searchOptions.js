import './App.css'

import React from 'react'
const API_KEY = "f9dd32e2110c4c129e3165857240909";

export default function SearchOptions({searchElement, optionName, getSelectedResult, changeSearchValue }) {
    const cords = `${optionName.lat},${optionName.lon}`;

    return (
        <div>
            <p className='option border-0 form-control' onClick={
                () => {

                    // console.log("cheching cors from EL:", cords);
                    // console.log("cheching region from EL:", optionName.region);
                    const currentUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cords}&days=3&aqi=no&alerts=no`;

                    getSelectedResult(currentUrl);
                    searchElement.value = optionName.region;
                }
            }>{optionName.region}</p>
        </div>
    )
}
