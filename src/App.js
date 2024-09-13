import './App.css';
import { getWeatherData as getData, selectFromSearchedTarget as searchData, getLocalDataWeather } from './API_Calls'


import { useState, useEffect } from 'react';

import Header from './Header';
import Search from './Search';
import Today from './Today';
import OtherDays from './OtherDays';

function App() {

  //setting the weather data
  const [data, setData] = useState(null);
  useEffect(() => {
    getLocalDataWeather()
      .then((data) => {
        // console.log("from setLocalData",data);
        
        setData(data);
        setsearchElement(document.querySelector('#search'));
      })
      .catch((error) => {
        console.error("Error fetching local data:", error);
      });
  }, [])

  const [searchElement, setsearchElement] = useState(null);


  //handling the search result
  const [searchresult, setSearchResult] = useState(null);

  useEffect(() =>{
    // console.log("from useEffect for search",searchresult);
    if(!Array.isArray(searchresult)){
      setData(searchresult);
    }
    else{
      // console.log("more than one result", searchresult);
      searchElement.value = '';
    }
    
  },[searchresult])
  
  const getSearchResults = async(value) =>{
    const result = await searchData(value);
    // console.log("from setting the search result",result);
    setSearchResult(result);
  }

  const getSelectedResult = async(url) =>{
    const result = await getData(url);
    // console.log("from setting the selected result",result);
    setSearchResult(result);
  }
  return (
    <div>
      <Header headerName={"Check Your Weather"} />
      <Search searchElement={searchElement} getSearchResults = {getSearchResults} getSelectedResult={getSelectedResult} searchResult={searchresult && searchresult}/>
      <div id="display-weather" className='p-4'>

        {data ? <Today data={data} /> : <p className=' text-center fs-4'>Loading weather data...</p>}
        <div id='next-days' className='d-flex justify-content-around w-100 p-2 my-3'>
          {data ? <OtherDays day={2} data={data.forecast.forecastday} /> : <p className=' text-center fs-4'>Loading weather data...</p>}
          {data ? <OtherDays day={3} data={data.forecast.forecastday} /> : <p className=' text-center fs-4'>Loading weather data...</p>}
        </div>

      </div>
    </div>
  );
}



export default App;
