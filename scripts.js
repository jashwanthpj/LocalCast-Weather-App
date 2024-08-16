// LocalCast Script: Handles Weather API interaction and DOM manipulation
// Author: Jashwanth Podduturi
// Date: 2024

// Event listener for form submission
document.getElementById('localcast').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission behavior

    // Retrieve the city name entered by the user
    var city = document.getElementById("place1").value;
    
    // Construct the API URL with the city name
    var apiUrl = `https://api.weatherapi.com/v1/current.json?key=285bf29baca44d3b82a64637241803&q=${city}`;
    
    // Fetch weather data from the API
    fetchData(apiUrl);
});

// Function to fetch weather data from the API and update the DOM
async function fetchData(url) {
    try {
        // Send a request to the API and wait for the response
        const response = await fetch(url);
        
        // Check if the response is not okay (status code is not 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response as JSON
        const data = await response.json();
        console.log(data);  // Log the data for debugging

        // Handle the case where the API returns an error
        if (data.error) {
            throw new Error(data.error.message);
        }

        // Change the background color of the result section
        document.getElementById("result").style.backgroundColor = "rgba(255, 255, 255, 0.5)";

        // Determine the weather condition and set the corresponding image source
        var condition = data.current.condition.text.trim().toLowerCase();
        var imgSrc;

        // Map weather conditions to appropriate icons
        if (condition === "clear") {
            imgSrc = "condition/clear.png";
        } else if (condition === "cloudy") {
            imgSrc = "condition/cloudy.png";
        } else if (condition === "fog") {
            imgSrc = "condition/fog.png";
        } else if (condition === "mist") {
            imgSrc = "condition/mist.png";
        } else if (condition === "partly cloudy") {
            imgSrc = "condition/partlycloudy.png";
        } else if (condition === "sunny") {
            imgSrc = "condition/sun.png";
        } else if (condition === "overcast") {
            imgSrc = "condition/overcast.png";
        } else if (condition === "patchy rain nearby") {
            imgSrc = "condition/patchyrain.png";
        } else if (condition === "patchy snow nearby") {
            imgSrc = "condition/snowy.png";
        } else if (condition === "moderate rain") {
            imgSrc = "condition/modrain.png";
        } else if (condition === "light snow") {
            imgSrc = "condition/lightsnow.png";
        } else if (condition === "patchy light rain in area with thunder") {
            imgSrc = "condition/rainthunder.png";
        }

        // Default image if no condition matches
        imgSrc = imgSrc || "condition/default.png";

        // Create a weather report string with the data
        const weatherReport = `
        <h1>${data.location.name},  ${data.location.region}</h1>
        <img src=${imgSrc} alt="${condition}">
        <p>temperature is ${data.current.temp_c}°C</p>
        <p>condition: ${data.current.condition.text}</p>
        <p>humidity is ${data.current.humidity} %</p>
        `;

        // Insert the weather report into the content section
        document.querySelector('.content').innerHTML = weatherReport;

    } catch (error) {
        console.error('Could not fetch data: ', error);  // Log error for debugging
        alert('City not found or invalid input! Please try again.');  // Alert the user in case of an error
    }
}
