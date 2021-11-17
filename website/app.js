/* Global Variables */
const WeatherMap_ApiKey = "00341eee1f64ec68fa01de49eb239499";

let date = document.getElementById("date");
let temp = document.getElementById("temp");
let feelings = document.getElementById("content");
let generate = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



/*      Helper Functions      */

/**
 * Send Post Request
 * 
 * @param string url, object data
 * 
 * @return data object or error message
 */
async function postData (url = '', data = {}) {
    let res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    try {
        let data= await res.json();
        return data;
    } catch (error) {
        console.log(`error: ${error}`);
    }
}


/** 
 * get external weather data from OpenWeatherMap API
 * 
 * @param zip code
 * 
 * @return weather data object or error message
 */
async function getWeatherData(zip) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${WeatherMap_ApiKey}&units=metric`;
    try {
        let data = await fetch(apiUrl)
        data = await data.json();
        return data;
    } catch (error) {
        console.log(`error: ${error}`);
    }
}


/**
 * Update the UI with the new weather data based on the Zip Code
 */
async function update_UI() {
    let req = await fetch('/home');
    try {
        let projectData = await req.json();
        date.innerHTML = `Current Date is: &nbsp&nbsp ${projectData.date}`;
        temp.innerHTML = `Current Temperature is: &nbsp&nbsp ${projectData.temp} degree`;
        feelings.innerHTML = `${projectData.feelings}`;
        
    } catch (error) {
        console.log(`error: ${error}`);
    }
}



/*                  Main Functions                    */

/** 
 * Update UI with Generated Weather Data
*/
async function generateData() {
    let zip = document.getElementById("zip");
    let feelings_ = document.getElementById("feelings");

    try {
        if (zip.value.length > 0) {
        // if zip has a value
            getWeatherData(zip.value).then(function(data = {}){
                postData('/updateProjectData', {
                        date: newDate,
                        temp: data.main.temp,
                        feelings: feelings_.value
                    }).then(setTimeout(function(){update_UI()}, 500));
            });
        }
        else {
            console.log("Enter Zip Value: ")
        }
    } catch (error) {
        console.log(`error: ${error}`)
    }
}


generate.addEventListener('click', generateData);   // Generate Data when Clicked