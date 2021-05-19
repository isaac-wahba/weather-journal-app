/**
 * /* Global Variables
 *
 * @format
 */

//DOM ELEMENTS
const generateButton = document.querySelector("#generate");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const dateDiv = document.getElementById("date");
const tempDiv = document.getElementById("temp");
const contentDiv = document.getElementById("content");

//VALIDATE ZIP CODE:
const validateZipCode = (zipCodeToTest) => {
  regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
  if (regexp.test(zipCodeToTest)) {
    return true;
  } else {
    return false;
  }
};
//API KEY AND BASE URL
const developerKey = "";
const baseURL = "http://api.openweathermap.org/data/2.5/forecast";
// Create a new date instance dynamically with JS (starter code)
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//GETTING WEATHER  DATA:
const getWeatherData = async (url, zipCode, key) => {
  let customeURL = `${url}?zip=${zipCode},us&units=metric&appid=${key}`;
  const apiData = await fetch(customeURL);
  try {
    const weatherData = await apiData.json();
    return weatherData;
  } catch (e) {
    console.log("Error: ", e);
  }
};

//POSTING DATA TO BACKEND:weatherData
const sendData = async (URL = "", userData = {}) => {
  console.log(userData);
  const data = await fetch(URL, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  try {
    const postedData = await data.json();
    return postedData;
  } catch (e) {
    console.log("Error: ", e);
  }
};
//UPDATING THE UI IN THE CLIENT SIDE:
const updateUI = async () => {
  const allData = await fetch("/allData");

  try {
    const projectData = await allData.json();
    console.log(projectData);

    tempDiv.innerHTML = `City Temperature: ${projectData.temp}`;
    dateDiv.innerHTML = `Today's Date: ${projectData.date}`;
    contentDiv.innerHTML = `My Feelings: ${projectData.feeling}`;
  } catch (e) {
    console.log("Error:", e);
  }
};

//FUNCTION TO BE INVOKED WHEN CLIICKING ON THE GENERATE BUTTON

const onGenerateClicked = async () => {
  const zipValue = zip.value;
  const feelingsText = feelings.value;
  if (validateZipCode(zipValue)) {
    getWeatherData(baseURL, zipValue, developerKey)
      .then((receivedWeatherData) => {
        let dataObject = {
          temp: receivedWeatherData.list[0].main.temp,
          date: d,
          feeling: feelingsText,
        };

        sendData("/addData", dataObject);
      })
      .then(() => {
        updateUI();
      });
  } else {
    alert("Please enter a valid zip code!");
  }
};

//HANDLING THE CLICK EVENT
generateButton.addEventListener("click", onGenerateClicked);


