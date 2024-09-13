const API_KEY = "f9dd32e2110c4c129e3165857240909";

export async function getWeatherData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }  // check if the response was successful, otherwise throw an error
        
        const data = await response.json();
        
        // console.log("Data: " , data);
        return data;

    } catch (error) {
        console.warn("Error fetching weather data:", error);
        return null;
    }
}

async function searchCity(city) {
    const searchUrl = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`;
    const response = await fetch(searchUrl);
    const searchData = await response.json();

    if (searchData.length > 0) {
        return searchData;
    } else {
        return null;
    }
}

export async function selectFromSearchedTarget(city) {
    const targets = await searchCity(city);
    // console.log("from api calls:", targets);
    
    if (targets && targets.length === 1) {
        const lat = targets[0].lat;
        const lon = targets[0].lon;
        const targetCord = `${lat},${lon}`;
        const currentUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${targetCord}&days=3&aqi=no&alerts=no`;
        const targetData = await getWeatherData(currentUrl);
        // console.log("from if in api", targetData);
        
        return targetData;
    } else if (targets && targets.length >= 1) {
        return targets;
    } else {
        alert("No cities found.");
    }
}

export function getLocalDataWeather() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const currentUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${position.coords.latitude},${position.coords.longitude}&days=3&aqi=no&alerts=no`;
      try {
        const localData = await getWeatherData(currentUrl);
        // console.log("from navigator", localData);
        resolve(localData);
      } catch (error) {
        console.error("Error fetching local data:", error);
        reject(error);
      }
    }, (error) => {
      console.error("Geolocation error:", error);
      reject(error);
    });
  });
}