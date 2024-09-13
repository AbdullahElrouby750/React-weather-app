import { useState } from 'react'

import SearchOptions from './searchOptions';

export default function Search({searchElement, getSearchResults, searchResult, getSelectedResult}) {
  const [searchValue, setSearchValue] = useState('')
  const changeSearchValue = function(value){
    setSearchValue(value);
  }


  return (
    <div className=' w-100 p-4 d-flex justify-content-center'>
      <input  type="text" name="" id="search" defaultValue={searchValue && searchValue}  placeholder={Array.isArray(searchResult) ?'Too much results for! Please, choose one' : 'Search by city/country/state name . . .'} className=' form-control border-0' onKeyDown={function(event) {
        if(event.key  === "Enter"){
          
          getSearchResults(event.target.value);
          
        }
      }}/>
      <div id="options" className= {`bg-light border rounded-2 d-flex flex-column justify-content-start p-2 ${!Array.isArray(searchResult) && 'd-none'}`}>
        {Array.isArray(searchResult) && searchResult.map((result, index) => {
          return <SearchOptions key = {index} searchElement={searchElement} optionName = {result}  getSelectedResult={getSelectedResult} changeSearchValue={changeSearchValue}/>
        })}
      </div>
    </div>
  )
}
